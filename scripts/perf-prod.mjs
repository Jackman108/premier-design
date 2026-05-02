import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { collectWebVitalsFallback } from './lib/perf-prod-fallback.mjs';
import { createScriptLogger } from './lib/script-logger.mjs';
import { withPerfAuditQuery } from './lib/perf-prod-url.mjs';

/** Конфигурация CLI/env (паритет febcode `perf-prod.mjs`; канон URL продакшена — premium-design.pro). */
const cliArgs = process.argv.slice(2);
const targetUrlArg = cliArgs.find((arg) => !arg.startsWith('--'));
const targetUrl = targetUrlArg || process.env.PERF_URL || 'https://premium-design.pro/';
const minScore = Number(process.env.PERF_MIN_SCORE || 0);
const shouldFailOnThreshold = cliArgs.includes('--ci') || minScore > 0;
const ciRuns = Number(process.env.PERF_CI_RUNS || (shouldFailOnThreshold ? 3 : 1));
const ciAggregation = process.env.PERF_CI_AGGREGATION || (shouldFailOnThreshold ? 'best' : 'single');
const usePerfAuditQuery = process.env.PERF_AUDIT_QUERY !== '0';
const MAX_RETRIES = Number(process.env.PERF_MAX_RETRIES || 5);
const require = createRequire(import.meta.url);
const logger = createScriptLogger('perf:prod');

const auditUrl = withPerfAuditQuery(targetUrl, usePerfAuditQuery);

const outDir = resolve('.perf');
const outFile = resolve(outDir, 'lh-prod.json');
const tempBaseDir = resolve(outDir, 'tmp');
mkdirSync(outDir, { recursive: true });
mkdirSync(tempBaseDir, { recursive: true });

const chromeFlags = [
	'--headless=new',
	'--no-sandbox',
	'--disable-extensions',
	'--disable-dev-shm-usage',
	'--disable-gpu',
].join(' ');

const lighthouseCliPath = require.resolve('lighthouse/cli/index.js');

const lhArgs = [
	lighthouseCliPath,
	auditUrl,
	'--quiet',
	`--chrome-flags=${chromeFlags}`,
	'--output=json',
	`--output-path=${outFile}`,
];

let report = null;
let lastRunStatus = 0;
const WINDOWS_EPHEMERAL_EPERM = /Runtime error encountered:\s*EPERM, Permission denied:/i;

function runLighthouseAttempt() {
	const attemptTempDir = mkdtempSync(resolve(tempBaseDir, 'lh-'));
	const run = spawnSync(process.execPath, lhArgs, {
		encoding: 'utf8',
		env: {
			...process.env,
			TMP: attemptTempDir,
			TEMP: attemptTempDir,
		},
	});
	rmSync(attemptTempDir, { recursive: true, force: true });

	const stdout = run.stdout ?? '';
	const stderr = run.stderr ?? '';
	if (stdout.trim().length > 0) process.stdout.write(stdout);
	return { status: run.status ?? 1, stderr };
}

function runSingleAudit() {
	report = null;
	lastRunStatus = 0;
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		const run = runLighthouseAttempt();
		lastRunStatus = run.status;

		if (run.status !== 0) {
			if (WINDOWS_EPHEMERAL_EPERM.test(run.stderr)) {
				logger.warn(`[attempt ${attempt}/${MAX_RETRIES}] Lighthouse temp EPERM on Windows, retrying…`);
			} else if (run.stderr.trim().length > 0) {
				process.stderr.write(run.stderr);
			}
			const msg = `[attempt ${attempt}/${MAX_RETRIES}] Lighthouse exited with status ${run.status}`;
			if (attempt < MAX_RETRIES) {
				logger.warn(`${msg}, retrying…`);
				continue;
			}
			logger.error(msg);
			break;
		}

		try {
			const candidate = JSON.parse(readFileSync(outFile, 'utf8'));
			const lcpAudit = candidate.audits?.['largest-contentful-paint'];
			const isNoLcp = lcpAudit?.scoreDisplayMode === 'error';

			if (!isNoLcp) {
				report = candidate;
				if (attempt > 1) logger.info(`[attempt ${attempt}/${MAX_RETRIES}] Valid LCP detected.`);
				break;
			}

			logger.warn(`[attempt ${attempt}/${MAX_RETRIES}] NO_LCP detected, retrying…`);
			report = candidate;
		} catch {
			logger.warn(`[attempt ${attempt}/${MAX_RETRIES}] Failed to parse report, retrying…`);
		}
	}

	if (!report) return null;

	return {
		report,
		perf: Math.round((report.categories?.performance?.score ?? 0) * 100),
		fcp: report.audits?.['first-contentful-paint']?.numericValue,
		lcp: report.audits?.['largest-contentful-paint']?.numericValue,
		tbt: report.audits?.['total-blocking-time']?.numericValue,
		cls: report.audits?.['cumulative-layout-shift']?.numericValue,
		si: report.audits?.['speed-index']?.numericValue,
	};
}

function pickAggregatedRun(runs, aggregation) {
	if (aggregation === 'median') {
		return [...runs].sort((a, b) => a.perf - b.perf)[Math.floor((runs.length - 1) / 2)];
	}
	return [...runs].sort((a, b) => b.perf - a.perf)[0];
}

function printSummary(selectedRun, runs) {
	logger.info('');
	logger.info('Lighthouse summary');
	logger.info(`URL: ${auditUrl}`);
	logger.info(`Report: ${outFile}`);
	if (runs.length > 1) {
		logger.info(`Runs: ${runs.map((run) => run.perf).join(', ')}`);
		logger.info(`Aggregation: ${ciAggregation === 'median' ? 'median' : 'best'}`);
	}
	logger.info(`Performance: ${selectedRun.perf}`);
	logger.info(`FCP: ${Math.round(selectedRun.fcp ?? 0)} ms`);
	logger.info(`LCP: ${Math.round(selectedRun.lcp ?? 0)} ms`);
	logger.info(`TBT: ${Math.round(selectedRun.tbt ?? 0)} ms`);
	logger.info(`CLS: ${selectedRun.cls ?? 0}`);
	logger.info(`Speed Index: ${Math.round(selectedRun.si ?? 0)} ms`);
}

const runCount = Math.max(1, Number.isFinite(ciRuns) ? ciRuns : 1);
const runs = [];
for (let i = 0; i < runCount; i++) {
	if (runCount > 1) logger.info(`\nLighthouse run ${i + 1}/${runCount}`);
	const result = runSingleAudit();
	if (!result) {
		if (lastRunStatus !== 0) logger.exit(lastRunStatus);
		logger.exit(1);
	}
	runs.push(result);
}

const selectedRun = pickAggregatedRun(runs, ciAggregation);
printSummary(selectedRun, runs);

const lcpAudit = selectedRun.report.audits?.['largest-contentful-paint'];
if (lcpAudit?.scoreDisplayMode === 'error') {
	logger.warn(`LCP audit error: ${lcpAudit.errorMessage ?? 'unknown'} (all ${MAX_RETRIES} attempts exhausted)`);
	try {
		const v = await collectWebVitalsFallback(auditUrl);
		logger.info('');
		logger.info('Web Vitals fallback (Playwright)');
		logger.info(`FCP: ${Math.round(v?.fcp ?? 0)} ms`);
		logger.info(`LCP: ${Math.round(v?.lcp ?? 0)} ms`);
		logger.info(`TBT (approx): ${Math.round(v?.tbt ?? 0)} ms`);
		logger.info(`CLS: ${v?.cls ?? 0}`);
	} catch (error) {
		const msg = error instanceof Error ? error.message : String(error);
		logger.warn(`Web Vitals fallback failed: ${msg}`);
	}
}

const lcpBreakdownInsight = selectedRun.report.audits?.['lcp-breakdown-insight'];
const lcpNode = lcpBreakdownInsight?.details?.items?.find((item) => item?.type === 'node');
if (lcpNode) {
	logger.info('');
	logger.info('LCP element');
	if (lcpNode.selector) logger.info(`Selector: ${lcpNode.selector}`);
	if (lcpNode.nodeLabel) logger.info(`Label: ${String(lcpNode.nodeLabel).slice(0, 120)}`);
}

if (shouldFailOnThreshold && selectedRun.perf < minScore) {
	logger.fail(`\nPerformance ${selectedRun.perf} is below required ${minScore}.`);
}
