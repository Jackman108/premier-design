#!/usr/bin/env node

/**
 * Генератор пост-релизного KPI-отчёта (окна 7/14 дней).
 *
 * Зачем:
 * - убрать ручную сверку KPI после релиза;
 * - привести проверку воронки к повторяемому формату;
 * - зафиксировать результат в markdown-отчёте для docs.
 *
 * Формат запуска:
 * node scripts/post-release-kpi-report.mjs --input=./kpi-input.json --output=./docs/kpi-post-release-report.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { METRIC_DEFINITIONS, STABLE_THRESHOLD_PERCENT, WEB_VITAL_BUDGETS } from './lib/kpi-report-constants.mjs';
import { createScriptLogger } from './lib/script-logger.mjs';

const logger = createScriptLogger('post-release-kpi-report');

function parseArgs(argv) {
	const args = {};
	for (const item of argv) {
		if (!item.startsWith('--')) continue;
		const normalized = item.slice(2);
		const [rawKey, ...rawValue] = normalized.split('=');
		const key = rawKey.trim();
		const value = rawValue.join('=').trim();
		if (!key) continue;
		args[key] = value || 'true';
	}
	return args;
}

function printTemplate() {
	const template = {
		release: {
			id: 'release-2026-04-01',
			date: '2026-04-01',
			owner: 'growth-team',
			notes: 'Кратко: что релизили и какие гипотезы проверяем',
		},
		baseline: {
			visitors: 1000,
			leads: 100,
			mqls: 60,
			deals: 15,
			serpCtr: 4.5,
			quizStepView: 800,
			quizSubmitSuccess: 70,
			lcp: 2200,
			inp: 180,
			cls: 0.08,
		},
		window7: {
			visitors: 1200,
			leads: 130,
			mqls: 80,
			deals: 20,
			serpCtr: 4.9,
			quizStepView: 950,
			quizSubmitSuccess: 98,
			lcp: 2100,
			inp: 170,
			cls: 0.07,
		},
		window14: {
			visitors: 2400,
			leads: 260,
			mqls: 158,
			deals: 39,
			serpCtr: 5.1,
			quizStepView: 1800,
			quizSubmitSuccess: 200,
			lcp: 2050,
			inp: 165,
			cls: 0.07,
		},
	};

	process.stdout.write(`${JSON.stringify(template, null, 2)}\n`);
}

function ensureNumber(value, fieldName) {
	const number = Number(value);
	if (!Number.isFinite(number)) {
		throw new Error(`Поле "${fieldName}" должно быть числом.`);
	}
	return number;
}

function ensureRequiredShape(input) {
	if (!input || typeof input !== 'object') {
		throw new Error('Входной JSON пустой или имеет неверный формат.');
	}

	const requiredBlocks = ['release', 'baseline', 'window7', 'window14'];
	for (const block of requiredBlocks) {
		if (!input[block] || typeof input[block] !== 'object') {
			throw new Error(`Отсутствует обязательный блок "${block}".`);
		}
	}
}

function normalizeWindow(windowData, blockName) {
	return {
		visitors: ensureNumber(windowData.visitors, `${blockName}.visitors`),
		leads: ensureNumber(windowData.leads, `${blockName}.leads`),
		mqls: ensureNumber(windowData.mqls, `${blockName}.mqls`),
		deals: ensureNumber(windowData.deals, `${blockName}.deals`),
		serpCtr: ensureNumber(windowData.serpCtr, `${blockName}.serpCtr`),
		quizStepView: ensureNumber(windowData.quizStepView, `${blockName}.quizStepView`),
		quizSubmitSuccess: ensureNumber(windowData.quizSubmitSuccess, `${blockName}.quizSubmitSuccess`),
		lcp: ensureNumber(windowData.lcp, `${blockName}.lcp`),
		inp: ensureNumber(windowData.inp, `${blockName}.inp`),
		cls: ensureNumber(windowData.cls, `${blockName}.cls`),
	};
}

function ratioPercent(numerator, denominator) {
	if (denominator <= 0) return 0;
	return (numerator / denominator) * 100;
}

function buildDerivedMetrics(windowData) {
	return {
		visitorToLeadCr: ratioPercent(windowData.leads, windowData.visitors),
		mqlRate: ratioPercent(windowData.mqls, windowData.leads),
		leadToDealCr: ratioPercent(windowData.deals, windowData.leads),
		serpCtr: windowData.serpCtr,
		quizFunnelCr: ratioPercent(windowData.quizSubmitSuccess, windowData.quizStepView),
		lcp: windowData.lcp,
		inp: windowData.inp,
		cls: windowData.cls,
	};
}

function formatNumber(value, digits = 2) {
	return Number(value).toFixed(digits);
}

function evaluateTrend({ currentValue, baselineValue, direction }) {
	if (baselineValue === 0) {
		return { deltaPercent: 0, status: 'stable' };
	}

	const deltaPercent = ((currentValue - baselineValue) / baselineValue) * 100;
	const absDelta = Math.abs(deltaPercent);
	if (absDelta < STABLE_THRESHOLD_PERCENT) {
		return { deltaPercent, status: 'stable' };
	}

	if (direction === 'higher') {
		return { deltaPercent, status: deltaPercent > 0 ? 'improved' : 'declined' };
	}

	return { deltaPercent, status: deltaPercent < 0 ? 'improved' : 'declined' };
}

function evaluateWebVitalBudget(metricKey, value) {
	const budget = WEB_VITAL_BUDGETS[metricKey];
	if (budget === undefined) return 'n/a';
	return value <= budget ? 'ok' : 'over-budget';
}

function toStatusLabel(status) {
	if (status === 'improved') return 'IMPROVED';
	if (status === 'declined') return 'DECLINED';
	return 'STABLE';
}

function createComparisonRows({ baselineMetrics, currentMetrics, title }) {
	const lines = [];
	lines.push(`### ${title}`);
	lines.push('');
	lines.push('| Метрика | Baseline | Текущее | Delta % | Статус | Budget |');
	lines.push('|---|---:|---:|---:|---|---|');

	for (const metric of METRIC_DEFINITIONS) {
		const baselineValue = baselineMetrics[metric.key];
		const currentValue = currentMetrics[metric.key];
		const trend = evaluateTrend({
			currentValue,
			baselineValue,
			direction: metric.direction,
		});
		const budgetStatus = evaluateWebVitalBudget(metric.key, currentValue);
		lines.push(
			`| ${metric.label} | ${formatNumber(baselineValue)} | ${formatNumber(currentValue)} | ${formatNumber(trend.deltaPercent)} | ${toStatusLabel(trend.status)} | ${budgetStatus} |`,
		);
	}

	lines.push('');
	return lines;
}

function buildSummary(window7Metrics, window14Metrics, baselineMetrics) {
	const critical = ['visitorToLeadCr', 'quizFunnelCr', 'mqlRate', 'leadToDealCr'];
	const worsened = critical.filter((metricKey) => {
		const seven = evaluateTrend({
			currentValue: window7Metrics[metricKey],
			baselineValue: baselineMetrics[metricKey],
			direction: 'higher',
		});
		const fourteen = evaluateTrend({
			currentValue: window14Metrics[metricKey],
			baselineValue: baselineMetrics[metricKey],
			direction: 'higher',
		});
		return seven.status === 'declined' || fourteen.status === 'declined';
	});

	if (worsened.length === 0) {
		return 'Итог: критичные KPI воронки не деградировали в окнах 7/14 дней.';
	}

	return `Итог: обнаружена деградация по критичным KPI (${worsened.join(', ')}). Нужен rollback/гипотезы корректировки.`;
}

function generateReport({ release, baselineMetrics, window7Metrics, window14Metrics }) {
	const now = new Date().toISOString().slice(0, 10);
	const lines = [];
	lines.push('# Post-Release KPI Report');
	lines.push('');
	lines.push(`**Сформировано**: ${now}`);
	lines.push(`**Release ID**: ${release.id}`);
	lines.push(`**Release Date**: ${release.date}`);
	lines.push(`**Owner**: ${release.owner || 'n/a'}`);
	lines.push('');
	lines.push(`**Примечание**: ${release.notes || 'n/a'}`);
	lines.push('');
	lines.push('## Сводка');
	lines.push('');
	lines.push(buildSummary(window7Metrics, window14Metrics, baselineMetrics));
	lines.push('');
	lines.push(...createComparisonRows({ baselineMetrics, currentMetrics: window7Metrics, title: 'Окно 7 дней' }));
	lines.push(...createComparisonRows({ baselineMetrics, currentMetrics: window14Metrics, title: 'Окно 14 дней' }));
	lines.push('## Следующие действия');
	lines.push('');
	lines.push(
		'1. Если есть `DECLINED` по Visitor -> Lead CR или Quiz Funnel CR: проверить изменения оффера/CTA и шаги формы.',
	);
	lines.push(
		'2. Если есть `DECLINED` по MQL Rate или Lead -> Deal CR: проверить качество лидов и SLA ответов в Telegram/CRM.',
	);
	lines.push('3. Если `over-budget` по LCP/INP/CLS: создать perf-задачу и зафиксировать план оптимизации.');
	lines.push('');
	return lines.join('\n');
}

function main() {
	const args = parseArgs(process.argv.slice(2));

	if (args['print-template'] === 'true') {
		printTemplate();
		return;
	}

	const inputPath = args.input;
	const outputPath = args.output || 'docs/kpi-post-release-report.md';

	if (!inputPath) {
		throw new Error(
			'Не указан --input. Пример: node scripts/post-release-kpi-report.mjs --input=./kpi-input.json --output=./docs/kpi-post-release-report.md',
		);
	}

	const resolvedInputPath = path.resolve(process.cwd(), inputPath);
	const resolvedOutputPath = path.resolve(process.cwd(), outputPath);

	if (!fs.existsSync(resolvedInputPath)) {
		throw new Error(`Файл входных данных не найден: ${resolvedInputPath}`);
	}

	const rawInput = fs.readFileSync(resolvedInputPath, 'utf-8');
	const input = JSON.parse(rawInput);
	ensureRequiredShape(input);

	const baseline = normalizeWindow(input.baseline, 'baseline');
	const window7 = normalizeWindow(input.window7, 'window7');
	const window14 = normalizeWindow(input.window14, 'window14');

	const report = generateReport({
		release: input.release,
		baselineMetrics: buildDerivedMetrics(baseline),
		window7Metrics: buildDerivedMetrics(window7),
		window14Metrics: buildDerivedMetrics(window14),
	});

	fs.mkdirSync(path.dirname(resolvedOutputPath), { recursive: true });
	fs.writeFileSync(resolvedOutputPath, report, 'utf-8');
	logger.info(`KPI отчёт сформирован: ${resolvedOutputPath}`);
}

try {
	main();
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	logger.fail(`Ошибка генерации KPI отчёта: ${message}`);
}
