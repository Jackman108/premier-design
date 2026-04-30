import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const cwd = process.cwd();
const args = process.argv.slice(2);
const failOnNearExpiry = args.includes('--fail-on-near-expiry');
const failOnUnused = args.includes('--fail-on-unused');
const thresholdDays = Number(process.env.ARCH_ALLOWLIST_NEAR_EXPIRY_DAYS ?? 30);
const now = new Date();
const IMPORT_RE = /from\s+['"]([^'"]+)['"]/g;
const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'coverage', 'storybook-static', 'styled-system']);
const toUnix = (value) => value.split('\\').join('/');

const allowlistPath = resolve(cwd, 'scripts/architecture-allowlist.json');
if (!existsSync(allowlistPath)) {
	console.error('Missing scripts/architecture-allowlist.json');
	process.exit(1);
}

const payload = JSON.parse(readFileSync(allowlistPath, 'utf-8'));
const entries = Array.isArray(payload.entries) ? payload.entries : [];
const maxAllowedCount = Number(payload.maxAllowedCount ?? entries.length);

const toDaysLeft = (dateText) => {
	const target = new Date(`${dateText}T00:00:00.000Z`);
	return Math.floor((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

const soonToExpire = entries
	.map((entry) => ({ ...entry, daysLeft: toDaysLeft(entry.expiresOn) }))
	.filter((entry) => entry.daysLeft <= thresholdDays)
	.sort((a, b) => a.daysLeft - b.daysLeft);

const byOwner = entries.reduce((acc, entry) => {
	const owner = entry.owner || 'unknown';
	acc[owner] = (acc[owner] ?? 0) + 1;
	return acc;
}, {});

const walkFiles = (dir, out) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const absolute = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!IGNORED_DIRS.has(entry.name)) {
				walkFiles(absolute, out);
			}
			continue;
		}
		if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name) && statSync(absolute).size > 0) {
			out.push(toUnix(relative(cwd, absolute)));
		}
	}
};

const allFiles = [];
walkFiles(cwd, allFiles);
const currentImports = new Set();
for (const file of allFiles) {
	const source = readFileSync(resolve(cwd, file), 'utf-8');
	for (const match of source.matchAll(IMPORT_RE)) {
		currentImports.add(`${file}|${match[1]}`);
	}
}

const unusedEntries = entries.filter((entry) => !currentImports.has(`${entry.source}|${entry.target}`));

console.log('\n=== Architecture Allowlist Debt Report ===');
console.log(`Current allowlist count: ${entries.length}`);
console.log(`Max allowed count: ${maxAllowedCount}`);
console.log(`Near-expiry threshold (days): ${thresholdDays}`);
console.log('\nBy owner:');
for (const [owner, count] of Object.entries(byOwner).sort((a, b) => b[1] - a[1])) {
	console.log(`- ${owner}: ${count}`);
}

console.log('\nNear expiry:');
if (soonToExpire.length === 0) {
	console.log('- none');
} else {
	for (const entry of soonToExpire) {
		console.log(
			`- ${entry.source} -> ${entry.target} | owner=${entry.owner} | expires=${entry.expiresOn} | daysLeft=${entry.daysLeft}`,
		);
	}
}

console.log('\nUnused allowlist entries (candidate to remove now):');
if (unusedEntries.length === 0) {
	console.log('- none');
} else {
	for (const entry of unusedEntries) {
		console.log(`- ${entry.source} -> ${entry.target} | owner=${entry.owner}`);
	}
}

if (entries.length > maxAllowedCount) {
	console.error('\nAllowlist count exceeded maxAllowedCount. Reduce entries before merge.');
	process.exit(1);
}

if (failOnNearExpiry && soonToExpire.length > 0) {
	console.error('\nFound near-expiry allowlist entries.');
	process.exit(1);
}

if (failOnUnused && unusedEntries.length > 0) {
	console.error('\nFound unused allowlist entries.');
	process.exit(1);
}
