import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const cwd = process.cwd();
const allowlistPath = resolve(cwd, 'scripts/architecture-allowlist.json');
const roadmapPath = resolve(cwd, 'scripts/architecture-allowlist-roadmap.json');

if (!existsSync(allowlistPath)) {
	console.error('Missing scripts/architecture-allowlist.json');
	process.exit(1);
}

if (!existsSync(roadmapPath)) {
	console.error('Missing scripts/architecture-allowlist-roadmap.json');
	process.exit(1);
}

const allowlistPayload = JSON.parse(readFileSync(allowlistPath, 'utf-8'));
const roadmapPayload = JSON.parse(readFileSync(roadmapPath, 'utf-8'));
const maxAllowedCount = Number(allowlistPayload.maxAllowedCount ?? 0);
const milestones = Array.isArray(roadmapPayload.milestones) ? roadmapPayload.milestones : [];

if (!Number.isFinite(maxAllowedCount) || maxAllowedCount < 0) {
	console.error('Invalid maxAllowedCount in scripts/architecture-allowlist.json');
	process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const dueMilestones = milestones
	.filter((item) => item?.dueOn && item?.maxAllowedCount !== undefined && item.dueOn <= today)
	.sort((a, b) => String(a.dueOn).localeCompare(String(b.dueOn)));

if (dueMilestones.length === 0) {
	console.log('Architecture allowlist progress check: no due milestones yet.');
	process.exit(0);
}

const currentMilestone = dueMilestones[dueMilestones.length - 1];
const requiredMax = Number(currentMilestone.maxAllowedCount);

if (!Number.isFinite(requiredMax) || requiredMax < 0) {
	console.error(`Invalid milestone maxAllowedCount for dueOn=${currentMilestone.dueOn}`);
	process.exit(1);
}

console.log('Architecture allowlist progress check:');
console.log(`- Today: ${today}`);
console.log(`- Current maxAllowedCount: ${maxAllowedCount}`);
console.log(`- Required maxAllowedCount by ${currentMilestone.dueOn}: <= ${requiredMax}`);

if (maxAllowedCount > requiredMax) {
	console.error('Allowlist reduction plan is behind schedule. Reduce maxAllowedCount before merge.');
	process.exit(1);
}

console.log('Architecture allowlist progress check passed.');
