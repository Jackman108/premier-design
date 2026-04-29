import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const cwd = process.cwd();
const now = Date.now();
const eventsFilePath = resolve(
	cwd,
	process.env.FEEDBACK_SLO_EVENTS_FILE?.trim() || '.audit/feedback-slo-events.jsonl',
);

const rollingHours = Number(process.env.FEEDBACK_SLO_ROLLING_HOURS ?? 24);
const minSamples = Number(process.env.FEEDBACK_SLO_MIN_SAMPLES ?? 20);
const p95BudgetMs = Number(process.env.FEEDBACK_SLO_P95_MS ?? 1500);
const errorRateBudgetPct = Number(process.env.FEEDBACK_SLO_ERROR_RATE_PCT ?? 5);
const timeoutRateBudgetPct = Number(process.env.FEEDBACK_SLO_TIMEOUT_RATE_PCT ?? 1);

if (!existsSync(eventsFilePath)) {
	console.log(`Feedback SLO check skipped: missing ${eventsFilePath}`);
	process.exit(0);
}

const raw = readFileSync(eventsFilePath, 'utf-8').trim();
if (!raw) {
	console.log('Feedback SLO check skipped: events file is empty.');
	process.exit(0);
}

const cutoffMs = now - rollingHours * 60 * 60 * 1000;
const events = raw
	.split('\n')
	.map((line) => {
		try {
			return JSON.parse(line);
		} catch {
			return null;
		}
	})
	.filter(Boolean)
	.filter((event) => event.route === '/api/feedback')
	.filter((event) => Number.isFinite(new Date(event.timestamp).getTime()))
	.filter((event) => new Date(event.timestamp).getTime() >= cutoffMs);

if (events.length < minSamples) {
	console.log(`Feedback SLO check skipped: ${events.length} sample(s), minimum required ${minSamples}.`);
	process.exit(0);
}

const durations = events
	.map((event) => Number(event.durationMs))
	.filter(Number.isFinite)
	.sort((a, b) => a - b);
const p95Index = Math.min(durations.length - 1, Math.max(0, Math.ceil(durations.length * 0.95) - 1));
const p95Ms = durations[p95Index] ?? 0;

const errorsCount = events.filter((event) => Number(event.statusCode) >= 500).length;
const timeoutCount = events.filter((event) => Boolean(event.timedOut)).length;
const errorRatePct = Number(((errorsCount / events.length) * 100).toFixed(2));
const timeoutRatePct = Number(((timeoutCount / events.length) * 100).toFixed(2));

console.log('\n=== Feedback API SLO (rolling window) ===');
console.log(`Window: last ${rollingHours}h`);
console.log(`Samples: ${events.length}`);
console.log(`p95 latency: ${p95Ms}ms (budget <= ${p95BudgetMs}ms)`);
console.log(`error rate: ${errorRatePct}% (budget <= ${errorRateBudgetPct}%)`);
console.log(`timeout rate: ${timeoutRatePct}% (budget <= ${timeoutRateBudgetPct}%)`);

const breaches = [];
if (p95Ms > p95BudgetMs) breaches.push(`p95 latency ${p95Ms}ms > ${p95BudgetMs}ms`);
if (errorRatePct > errorRateBudgetPct) breaches.push(`error rate ${errorRatePct}% > ${errorRateBudgetPct}%`);
if (timeoutRatePct > timeoutRateBudgetPct) breaches.push(`timeout rate ${timeoutRatePct}% > ${timeoutRateBudgetPct}%`);

if (breaches.length > 0) {
	console.error('\nFeedback SLO alert thresholds breached:');
	for (const breach of breaches) {
		console.error(`- ${breach}`);
	}
	process.exit(1);
}

console.log('Feedback SLO check passed.');
