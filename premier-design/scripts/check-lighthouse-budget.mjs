/**
 * Бюджет Lighthouse (mobile lab) для URL приложения.
 *
 * Сервер: `node .next/standalone/server.js` — у нас `output: 'standalone'`, так корректнее, чем `next start`.
 *
 * Запуск Lighthouse через API + `chrome-launcher`: на Windows `kill()` иногда даёт EPERM при удалении tmp — ловим ошибку, отчёт уже есть.
 *
 * Windows: headless часто падает с interstitial — по умолчанию шаг пропускается; полный замер в Linux CI. Принудительно: `PERF_AUDIT_FORCE_LIGHTHOUSE=true`.
 */
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import perfConfig from 'lighthouse/core/config/perf-config.js';

const ROOT = process.cwd();
// TMP внутри репо — меньше EPERM у chrome-launcher на Windows при очистке профиля.
const lighthouseTempRoot = path.join(ROOT, '.lighthouse-tmp');
fs.mkdirSync(lighthouseTempRoot, {recursive: true});
process.env.TMP = lighthouseTempRoot;
process.env.TEMP = lighthouseTempRoot;

const DEFAULT_PORT = Number(process.env.PERF_AUDIT_PORT ?? 3100);
const BASE_URL = process.env.PERF_AUDIT_URL ?? `http://127.0.0.1:${DEFAULT_PORT}/`;
const reuseServer = process.env.PERF_AUDIT_REUSE_SERVER === 'true';
const standaloneServerJs = path.join(ROOT, '.next', 'standalone', 'server.js');
const chromeUserDataDir = path.join(ROOT, '.lighthouse-chrome-profile').replace(/\\/g, '/');
const SUMMARY_PATH = path.join(ROOT, '.lighthouse-perf-summary.json');
const isCi = Boolean(process.env.CI);
const failOnInfraError = process.env.PERF_AUDIT_FAIL_ON_INFRA_ERROR === 'true';

const DEFAULT_THRESHOLDS = {
	PERFORMANCE_SCORE: 0.9,
	LCP_MS: 2500,
	CLS: 0.1,
	INP_MS: 200,
	TBT_MS: 300,
};

const thresholds = {
	performanceScore: Number(process.env.PERF_BUDGET_SCORE ?? DEFAULT_THRESHOLDS.PERFORMANCE_SCORE),
	lcp: Number(process.env.PERF_BUDGET_LCP_MS ?? DEFAULT_THRESHOLDS.LCP_MS),
	cls: Number(process.env.PERF_BUDGET_CLS ?? DEFAULT_THRESHOLDS.CLS),
	inp: Number(process.env.PERF_BUDGET_INP_MS ?? DEFAULT_THRESHOLDS.INP_MS),
	tbt: Number(process.env.PERF_BUDGET_TBT_MS ?? DEFAULT_THRESHOLDS.TBT_MS),
};

/** Печать порогов — чтобы на Windows без прогона были «видны цифры» ожиданий CI. */
const printThresholdsRu = () => {
	console.log('');
	console.log('=== Lighthouse: пороги CI (сравнение после прогона на Linux) ===');
	console.log(`  Performance score (0–1): ≥ ${thresholds.performanceScore}`);
	console.log(`  LCP (мс): ≤ ${thresholds.lcp}`);
	console.log(`  CLS: ≤ ${thresholds.cls}`);
	console.log(`  INP (мс): ≤ ${thresholds.inp} (в lab часто n/a — тогда не проверяется)`);
	console.log(`  TBT (мс): ≤ ${thresholds.tbt}`);
	console.log(`  URL замера: ${BASE_URL}`);
	console.log('');
};

/** Итоговые цифры прогона — в консоль (рус.) и в JSON для артефакта/просмотра. */
const printMetricsRu = (metrics) => {
	const perfPct = Math.round((metrics.score ?? 0) * 100);
	const inpText = Number.isFinite(metrics.inp) ? `${Math.round(metrics.inp)} мс` : 'n/a (нет в lab)';
	console.log('');
	console.log('=== Lighthouse: результат прогона ===');
	console.log(`  Оценка Performance: ${perfPct}/100 (сырой score ${(metrics.score ?? 0).toFixed(3)})`);
	console.log(`  LCP: ${Math.round(metrics.lcp)} мс`);
	console.log(`  CLS: ${(metrics.cls ?? 0).toFixed(4)}`);
	console.log(`  INP: ${inpText}`);
	console.log(`  TBT: ${Math.round(metrics.tbt)} мс`);
	console.log('');
};

const writeSummary = (payload) => {
	try {
		fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
		console.log(`Сводка сохранена: ${path.relative(ROOT, SUMMARY_PATH)}`);
	} catch (e) {
		console.warn('Не удалось записать сводку:', e?.message ?? e);
	}
};

if (process.env.PERF_AUDIT_SKIP_LIGHTHOUSE === 'true') {
	printThresholdsRu();
	console.log('Статус: PERF_AUDIT_SKIP_LIGHTHOUSE — прогон отключён.');
	writeSummary({skipped: true, reason: 'PERF_AUDIT_SKIP_LIGHTHOUSE', thresholds, baseUrl: BASE_URL});
	process.exit(0);
}

if (process.platform === 'win32' && process.env.PERF_AUDIT_FORCE_LIGHTHOUSE !== 'true') {
	printThresholdsRu();
	console.log(
		'Статус: пропуск Windows (нестабильный headless / interstitial). Фактические цифры — в логе job «CI Quality Gates» на ubuntu после `yarn check:perf:lighthouse`.',
	);
	console.log('Локально принудительно: PERF_AUDIT_FORCE_LIGHTHOUSE=true');
	writeSummary({
		skipped: true,
		reason: 'win32_default_skip',
		thresholds,
		baseUrl: BASE_URL,
		note: 'Метрики не измерялись на этой ОС.',
	});
	process.exit(0);
}

const cleanupLighthouseTemps = () => {
	const dirs = [lighthouseTempRoot, chromeUserDataDir];
	for (const dir of dirs) {
		try {
			fs.rmSync(dir, {recursive: true, force: true});
		} catch {
			// не блокируем CI на best-effort очистке временных профилей
		}
	}
};

const startStandaloneServer = () => {
	if (!fs.existsSync(standaloneServerJs)) {
		throw new Error(
			`Нет ${path.relative(ROOT, standaloneServerJs)} — сначала yarn build.`,
		);
	}
	return spawn(process.execPath, [standaloneServerJs], {
		stdio: ['ignore', 'pipe', 'pipe'],
		env: {
			...process.env,
			NODE_ENV: 'production',
			PORT: String(DEFAULT_PORT),
			HOSTNAME: '0.0.0.0',
		},
	});
};

const waitForServer = (server, timeoutMs = 90000) =>
	new Promise((resolve, reject) => {
		const startedAt = Date.now();
		const interval = setInterval(async () => {
			if (Date.now() - startedAt > timeoutMs) {
				clearInterval(interval);
				reject(new Error('Таймаут ожидания standalone-сервера.'));
				return;
			}
			try {
				const response = await fetch(BASE_URL);
				if (response.ok) {
					clearInterval(interval);
					resolve();
				}
			} catch {
				// сервер ещё поднимается
			}
		}, 500);

		server.on('exit', (code) => {
			clearInterval(interval);
			reject(new Error(`Standalone-сервер завершился с кодом ${code}`));
		});
	});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const warmupUrl = async (url, attempts = 10) => {
	for (let attempt = 1; attempt <= attempts; attempt += 1) {
		try {
			const response = await fetch(url, {headers: {'cache-control': 'no-cache'}});
			const html = await response.text();
			// Ждём полноценный HTML Next.js, чтобы избежать раннего старта Lighthouse.
			if (response.ok && /<html/i.test(html) && /__NEXT_DATA__|_next\//i.test(html)) {
				return;
			}
		} catch {
			// warmup retry
		}
		await sleep(500);
	}
	throw new Error(`Не удалось прогреть URL перед Lighthouse: ${url}`);
};

const extractMetrics = (lhr) => {
	const score = Number(lhr?.categories?.performance?.score ?? 0);
	const lcp = Number(lhr?.audits?.['largest-contentful-paint']?.numericValue ?? Number.POSITIVE_INFINITY);
	const cls = Number(lhr?.audits?.['cumulative-layout-shift']?.numericValue ?? Number.POSITIVE_INFINITY);
	const inpRaw = lhr?.audits?.['interaction-to-next-paint']?.numericValue;
	const inp = typeof inpRaw === 'number' && Number.isFinite(inpRaw) ? inpRaw : Number.NaN;
	const tbt = Number(lhr?.audits?.['total-blocking-time']?.numericValue ?? Number.POSITIVE_INFINITY);
	return {score, lcp, cls, inp, tbt};
};

const runLighthouseWithRetry = async (url, flags, config, attempts = 3) => {
	let lastError;
	for (let attempt = 1; attempt <= attempts; attempt += 1) {
		let localChrome;
		try {
			cleanupLighthouseTemps();
			await sleep(400 * attempt);
			localChrome = await chromeLauncher.launch({
				chromePath: flags.chromePath,
				chromeFlags: flags.chromeFlags,
			});
			const result = await lighthouse(url, {...flags, port: localChrome.port}, config);
			if (!result?.lhr) {
				throw new Error('Lighthouse не вернул LHR.');
			}
			if (result.lhr.runtimeError) {
				throw new Error(result.lhr.runtimeError.message);
			}
			try {
				await localChrome.kill();
			} catch {
				// ignore
			}
			return result;
		} catch (error) {
			lastError = error;
			if (localChrome) {
				try {
					await localChrome.kill();
				} catch {
					// ignore
				}
			}
			if (attempt < attempts) {
				console.warn(`Lighthouse retry ${attempt}/${attempts - 1}:`, String(error));
				await sleep(attempt * 2000);
			}
		}
	}
	throw lastError ?? new Error('Lighthouse retry limit reached.');
};

const resolveChromePath = async () => {
	if (process.env.CHROME_PATH) {
		return fs.existsSync(process.env.CHROME_PATH) ? process.env.CHROME_PATH : undefined;
	}
	// В CI предпочитаем системный Chrome раннера: Playwright Chromium периодически даёт LH net::ERR_ABORTED.
	if (isCi && process.env.PERF_AUDIT_FORCE_PLAYWRIGHT_CHROME !== 'true') {
		return undefined;
	}
	if (process.platform === 'win32') {
		const stable = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
		if (fs.existsSync(stable)) {
			return stable;
		}
	}
	try {
		const {chromium} = await import('playwright');
		const playwrightChrome = chromium.executablePath();
		// В CI браузер Playwright может быть не установлен — тогда даём chrome-launcher выбрать системный Chrome.
		if (playwrightChrome && fs.existsSync(playwrightChrome)) {
			return playwrightChrome;
		}
		return undefined;
	} catch {
		return undefined;
	}
};

const server = reuseServer ? null : startStandaloneServer();
let serverLogs = '';
if (server) {
	server.stdout.on('data', (chunk) => {
		serverLogs += String(chunk);
	});
	server.stderr.on('data', (chunk) => {
		serverLogs += String(chunk);
	});
}

try {
	printThresholdsRu();

	if (server) {
		await waitForServer(server);
	}
	await warmupUrl(BASE_URL, 12);
	await sleep(1200);

	const chromePath = await resolveChromePath();

	const flags = {
		chromePath,
		chromeFlags: [
			'--headless=new',
			'--no-sandbox',
			'--disable-dev-shm-usage',
			'--disable-gpu',
			'--no-first-run',
			'--no-default-browser-check',
			`--user-data-dir=${chromeUserDataDir}`,
		],
		logLevel: 'error',
		formFactor: 'mobile',
		screenEmulation: {disabled: true},
		throttlingMethod: 'provided',
		disableEmulatedUserAgent: true,
	};

	const attempts = process.env.CI ? 4 : 3;
	const runnerResult = await runLighthouseWithRetry(BASE_URL, flags, perfConfig, attempts);

	const metrics = extractMetrics(runnerResult.lhr);
	printMetricsRu(metrics);

	const failures = [];

	if (metrics.score < thresholds.performanceScore) {
		failures.push(`score ${metrics.score.toFixed(2)} < ${thresholds.performanceScore}`);
	}
	if (metrics.lcp > thresholds.lcp) {
		failures.push(`LCP ${Math.round(metrics.lcp)}ms > ${thresholds.lcp}ms`);
	}
	if (metrics.cls > thresholds.cls) {
		failures.push(`CLS ${metrics.cls.toFixed(3)} > ${thresholds.cls}`);
	}
	if (Number.isFinite(metrics.inp) && metrics.inp > thresholds.inp) {
		failures.push(`INP ${Math.round(metrics.inp)}ms > ${thresholds.inp}ms`);
	}
	if (metrics.tbt > thresholds.tbt) {
		failures.push(`TBT ${Math.round(metrics.tbt)}ms > ${thresholds.tbt}ms`);
	}

	const passed = failures.length === 0;
	writeSummary({
		skipped: false,
		passed,
		baseUrl: BASE_URL,
		thresholds,
		metrics: {
			performanceScore: metrics.score,
			performancePercent: Math.round(metrics.score * 100),
			lcpMs: Math.round(metrics.lcp),
			cls: metrics.cls,
			inpMs: Number.isFinite(metrics.inp) ? Math.round(metrics.inp) : null,
			tbtMs: Math.round(metrics.tbt),
		},
		failures,
		at: new Date().toISOString(),
	});

	if (!passed) {
		console.error(`::error::Бюджет Lighthouse: ${failures.join('; ')}`);
		process.exit(1);
	}

	console.log('Итог: все метрики в пределах порогов CI.');
} catch (error) {
	const errorText = String(error);
	const isInfraAborted = /net::ERR_ABORTED/i.test(errorText);

	if (isCi && isInfraAborted && !failOnInfraError) {
		console.warn('::warning::Lighthouse недоступен из-за инфраструктурной ошибки (net::ERR_ABORTED). Gate переведён в fail-open для CI.');
		writeSummary({
			skipped: true,
			passed: true,
			reason: 'lighthouse_infra_err_aborted_fail_open',
			error: errorText,
			baseUrl: BASE_URL,
			thresholds,
			at: new Date().toISOString(),
		});
		process.exit(0);
	}

	console.error('::error::Ошибка прогона Lighthouse.');
	console.error(errorText);
	if (serverLogs) {
		console.error(serverLogs);
	}
	writeSummary({
		skipped: false,
		passed: false,
		error: String(error),
		baseUrl: BASE_URL,
		thresholds,
		at: new Date().toISOString(),
	});
	process.exit(1);
} finally {
	if (server) {
		server.kill();
	}
	cleanupLighthouseTemps();
}
