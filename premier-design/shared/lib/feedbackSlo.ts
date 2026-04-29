import {appendFileSync, existsSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

type FeedbackSloSample = {
	statusCode: number;
	durationMs: number;
	timedOut: boolean;
};

type FeedbackSloStoredSample = FeedbackSloSample & {
	timestamp: string;
	route: '/api/feedback';
};

const isFinitePositiveNumber = (value: number) => Number.isFinite(value) && value >= 0;

const toIntOrDefault = (raw: string | undefined, fallback: number) => {
	const parsed = Number(raw);
	return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
};

const SLO_ENABLED = process.env.FEEDBACK_SLO_ENABLED !== 'false';
const DEFAULT_EVENTS_FILE = '.audit/feedback-slo-events.jsonl';

/**
 * Лимит `withTimeout` вокруг `submitFeedbackAction`: SMTP и Telegram в `submitFeedback` идут **параллельно**;
 * `retryAsync` (2 попытки) + таймауты `feedbackDal` / `TELEGRAM_REQUEST_TIMEOUT_MS` — укладывайте `FEEDBACK_API_TIMEOUT_MS` с запасом.
 * Явно задайте `FEEDBACK_API_TIMEOUT_MS` при жёстком SLO.
 */
const defaultFeedbackApiTimeoutMs = () =>
	process.env.NODE_ENV === 'development' ? 30_000 : 20_000;

export const getFeedbackApiTimeoutMs = () =>
	toIntOrDefault(process.env.FEEDBACK_API_TIMEOUT_MS, defaultFeedbackApiTimeoutMs());

const getEventsFilePath = () => {
	const configuredPath = process.env.FEEDBACK_SLO_EVENTS_FILE?.trim();
	return resolve(process.cwd(), configuredPath || DEFAULT_EVENTS_FILE);
};

export const recordFeedbackSloSample = (sample: FeedbackSloSample) => {
	if (!SLO_ENABLED) {
		return;
	}

	if (
		!isFinitePositiveNumber(sample.durationMs)
		|| !Number.isInteger(sample.statusCode)
		|| sample.statusCode < 100
		|| sample.statusCode > 599
	) {
		return;
	}

	const payload: FeedbackSloStoredSample = {
		route: '/api/feedback',
		timestamp: new Date().toISOString(),
		statusCode: sample.statusCode,
		durationMs: Math.round(sample.durationMs),
		timedOut: Boolean(sample.timedOut),
	};

	try {
		const eventsFilePath = getEventsFilePath();
		const parentDir = dirname(eventsFilePath);
		if (!existsSync(parentDir)) {
			mkdirSync(parentDir, {recursive: true});
		}
		appendFileSync(eventsFilePath, `${JSON.stringify(payload)}\n`, 'utf-8');
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error';
		console.error(`[feedback-slo] failed to persist sample: ${message}`);
	}

	console.info(
		`[feedback-slo] route=/api/feedback status=${payload.statusCode} durationMs=${payload.durationMs} timedOut=${payload.timedOut}`,
	);
};
