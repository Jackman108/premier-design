import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const cwd = process.cwd();
const trendsPath = resolve(cwd, '.ci-trends-14d.json');
const targetWorkflow = process.env.CI_SLA_WORKFLOW_NAME ?? 'CI Quality Gates';
const p95BudgetMin = Number(process.env.CI_SLA_P95_BUDGET_MIN ?? 25);

if (!Number.isFinite(p95BudgetMin) || p95BudgetMin <= 0) {
	console.error('Invalid CI_SLA_P95_BUDGET_MIN. Must be a positive number.');
	process.exit(1);
}

if (!existsSync(trendsPath)) {
	console.log('CI SLA check skipped: .ci-trends-14d.json is missing.');
	process.exit(0);
}

const payload = JSON.parse(readFileSync(trendsPath, 'utf-8'));
const report = Array.isArray(payload.report) ? payload.report : [];
const item = report.find((row) => row.workflowName === targetWorkflow);

if (!item || item.missing) {
	console.log(`CI SLA check skipped: workflow "${targetWorkflow}" is absent in trends report.`);
	process.exit(0);
}

const p95DurationMin = Number(item.p95DurationMin ?? 0);
console.log('CI SLA check:');
console.log(`- Workflow: ${targetWorkflow}`);
console.log(`- p95 duration: ${p95DurationMin} min`);
console.log(`- Budget: <= ${p95BudgetMin} min`);

if (p95DurationMin > p95BudgetMin) {
	console.error(`CI SLA breach: p95 ${p95DurationMin} min > ${p95BudgetMin} min.`);
	process.exit(1);
}

console.log('CI SLA check passed.');
