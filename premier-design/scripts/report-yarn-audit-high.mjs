import {writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const commandResult = spawnSync('yarn', ['audit', '--level', 'high', '--json'], {
	cwd: process.cwd(),
	encoding: 'utf-8',
	shell: process.platform === 'win32',
});

const output = `${commandResult.stdout ?? ''}\n${commandResult.stderr ?? ''}`;
const lines = output
	.split('\n')
	.map((line) => line.trim())
	.filter(Boolean);

let high = 0;
let critical = 0;
let moderate = 0;
let low = 0;
let info = 0;
const advisories = [];

for (const line of lines) {
	try {
		const payload = JSON.parse(line);
		if (payload.type === 'auditSummary' && payload.data?.vulnerabilities) {
			high = Number(payload.data.vulnerabilities.high ?? 0);
			critical = Number(payload.data.vulnerabilities.critical ?? 0);
			moderate = Number(payload.data.vulnerabilities.moderate ?? 0);
			low = Number(payload.data.vulnerabilities.low ?? 0);
			info = Number(payload.data.vulnerabilities.info ?? 0);
		}
		if (payload.type === 'auditAdvisory' && payload.data?.advisory) {
			const advisory = payload.data.advisory;
			if (advisory.severity === 'high' || advisory.severity === 'critical') {
				advisories.push({
					id: advisory.id,
					title: advisory.title,
					module: advisory.module_name,
					severity: advisory.severity,
					url: advisory.url,
				});
			}
		}
	} catch {
		// ignore non-JSON lines
	}
}

const summary = {
	generatedAt: new Date().toISOString(),
	high,
	critical,
	moderate,
	low,
	info,
	advisories,
};

const mdLines = [
	'# Security Audit (high+critical)',
	'',
	`- high: **${high}**`,
	`- critical: **${critical}**`,
	`- moderate: ${moderate}`,
	`- low: ${low}`,
	`- info: ${info}`,
	'',
	'## Advisories (high+critical)',
];

if (advisories.length === 0) {
	mdLines.push('- none');
} else {
	for (const advisory of advisories.slice(0, 50)) {
		mdLines.push(`- [${advisory.severity}] ${advisory.module}: ${advisory.title} (${advisory.url})`);
	}
}

const summaryMd = `${mdLines.join('\n')}\n`;
writeFileSync(resolve(process.cwd(), '.audit-high-summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf-8');
writeFileSync(resolve(process.cwd(), '.audit-high-summary.md'), summaryMd, 'utf-8');

console.log(summaryMd);
