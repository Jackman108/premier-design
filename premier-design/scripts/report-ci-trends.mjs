import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const rollingDays = Number(process.env.CI_TREND_ROLLING_DAYS ?? 14);
const workflowNames = (process.env.CI_TREND_WORKFLOWS ?? 'CI Quality Gates,E2E Extended Nightly')
	.split(',')
	.map((item) => item.trim())
	.filter(Boolean);

if (!token || !repository) {
	console.error('Missing required env vars: GITHUB_TOKEN and/or GITHUB_REPOSITORY');
	process.exit(1);
}

const [owner, repo] = repository.split('/');
const since = new Date(Date.now() - rollingDays * 24 * 60 * 60 * 1000).toISOString();

const ghFetch = async (path) => {
	const response = await fetch(`https://api.github.com${path}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github+json',
		},
	});
	if (!response.ok) {
		throw new Error(`GitHub API ${path} failed: ${response.status} ${response.statusText}`);
	}
	return response.json();
};

const getAllRunsForWorkflow = async (workflowId) => {
	const runs = [];
	let page = 1;
	while (page <= 5) {
		const data = await ghFetch(
			`/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs?per_page=100&page=${page}&status=completed`,
		);
		const batch = Array.isArray(data.workflow_runs) ? data.workflow_runs : [];
		if (batch.length === 0) {
			break;
		}
		runs.push(...batch);
		const lastCreatedAt = batch[batch.length - 1]?.created_at;
		if (lastCreatedAt && new Date(lastCreatedAt).toISOString() < since) {
			break;
		}
		page += 1;
	}
	return runs.filter((run) => new Date(run.created_at).toISOString() >= since);
};

const getDurationMinutes = (run) => {
	// run_started_at исключает шум очереди раннера и лучше отражает фактическую длительность job.
	const started = new Date(run.run_started_at ?? run.created_at).getTime();
	const finished = new Date(run.updated_at).getTime();
	return Math.max(0, (finished - started) / 1000 / 60);
};

const percentile = (sortedValues, p) => {
	if (sortedValues.length === 0) {
		return 0;
	}
	const idx = Math.min(sortedValues.length - 1, Math.max(0, Math.ceil((p / 100) * sortedValues.length) - 1));
	return sortedValues[idx];
};

const workflowsData = await ghFetch(`/repos/${owner}/${repo}/actions/workflows?per_page=100`);
const workflows = Array.isArray(workflowsData.workflows) ? workflowsData.workflows : [];

const report = [];
for (const workflowName of workflowNames) {
	const workflow = workflows.find((item) => item.name === workflowName);
	if (!workflow) {
		report.push({
			workflowName,
			missing: true,
		});
		continue;
	}

	const runs = await getAllRunsForWorkflow(workflow.id);
	const durations = runs.map(getDurationMinutes).sort((a, b) => a - b);
	const total = runs.length;
	const failures = runs.filter((run) => run.conclusion && !['success', 'skipped'].includes(run.conclusion)).length;
	const retriesRecovered = runs.filter((run) => (run.run_attempt ?? 1) > 1 && run.conclusion === 'success').length;

	report.push({
		workflowName,
		workflowId: workflow.id,
		totalRuns: total,
		averageDurationMin: total ? Number((durations.reduce((a, b) => a + b, 0) / total).toFixed(2)) : 0,
		p50DurationMin: Number(percentile(durations, 50).toFixed(2)),
		p95DurationMin: Number(percentile(durations, 95).toFixed(2)),
		failureRatePct: total ? Number(((failures / total) * 100).toFixed(2)) : 0,
		recoveredRetryRatePct: total ? Number(((retriesRecovered / total) * 100).toFixed(2)) : 0,
	});
}

const summaryLines = [
	`# CI Trends (${rollingDays}d)`,
	'',
	`Repository: \`${repository}\``,
	`Window start: \`${since}\``,
	'',
	'| Workflow | Runs | Avg (min) | P50 (min) | P95 (min) | Failure % | Recovered retry % |',
	'|---|---:|---:|---:|---:|---:|---:|',
];

for (const item of report) {
	if (item.missing) {
		summaryLines.push(`| ${item.workflowName} | n/a | n/a | n/a | n/a | n/a | n/a |`);
		continue;
	}
	summaryLines.push(
		`| ${item.workflowName} | ${item.totalRuns} | ${item.averageDurationMin} | ${item.p50DurationMin} | ${item.p95DurationMin} | ${item.failureRatePct} | ${item.recoveredRetryRatePct} |`,
	);
}

const markdown = `${summaryLines.join('\n')}\n`;
const jsonPayload = {
	repository,
	rollingDays,
	since,
	generatedAt: new Date().toISOString(),
	report,
};

const mdPath = resolve(process.cwd(), '.ci-trends-14d.md');
const jsonPath = resolve(process.cwd(), '.ci-trends-14d.json');
writeFileSync(mdPath, markdown, 'utf-8');
writeFileSync(jsonPath, `${JSON.stringify(jsonPayload, null, 2)}\n`, 'utf-8');

console.log(markdown);
