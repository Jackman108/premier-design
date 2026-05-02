import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const cwd = process.cwd();
const args = process.argv.slice(2);
const failOnViolations = args.includes('--fail-on-violations');
const failOnNearExpiry = args.includes('--fail-on-near-expiry');
const failOnUnused = args.includes('--fail-on-unused');

const thresholdDays = Number(process.env.DECOMPOSITION_NEAR_EXPIRY_DAYS ?? 30);
const now = new Date();

const SCAN_ROOTS = ['src/features', 'src/widgets', 'src/pages-layer'];
const EXCLUDE_SUBSTRINGS = ['__tests__', '.test.', '.spec.', '.stories.'];

const toUnix = (value) => value.split('\\').join('/');

const allowlistPath = resolve(cwd, 'scripts/decomposition-allowlist.json');
if (!existsSync(allowlistPath)) {
	console.error('Missing scripts/decomposition-allowlist.json');
	process.exit(1);
}

const payload = JSON.parse(readFileSync(allowlistPath, 'utf-8'));
const entries = Array.isArray(payload.entries) ? payload.entries : [];
const threshold = Number(process.env.DECOMPOSITION_MAX_LINES ?? payload.threshold ?? 200);
const maxAllowedCount = Number(payload.maxAllowedCount ?? entries.length);

const entryByPath = new Map(entries.map((e) => [toUnix(e.path), e]));

const shouldSkipPath = (posixPath) => {
	if (!posixPath.endsWith('.ts') && !posixPath.endsWith('.tsx')) return true;
	if (posixPath.endsWith('.d.ts')) return true;
	return EXCLUDE_SUBSTRINGS.some((frag) => posixPath.includes(frag));
};

const walkFiles = (dir, out) => {
	if (!existsSync(dir)) return;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const absolute = join(dir, entry.name);
		if (entry.isDirectory()) {
			walkFiles(absolute, out);
			continue;
		}
		if (!entry.isFile() || statSync(absolute).size === 0) continue;
		const rel = toUnix(relative(cwd, absolute));
		if (shouldSkipPath(rel)) continue;
		out.push(rel);
	}
};

const countLines = (absolute) => {
	const raw = readFileSync(absolute, 'utf-8');
	return raw.split(/\r?\n/).length;
};

const scanned = [];
for (const root of SCAN_ROOTS) {
	walkFiles(resolve(cwd, root), scanned);
}

const lineCounts = new Map();
for (const rel of scanned) {
	lineCounts.set(rel, countLines(resolve(cwd, rel)));
}

const overThreshold = [...lineCounts.entries()].filter(([, n]) => n > threshold).sort((a, b) => b[1] - a[1]);

const toDaysLeft = (dateText) => {
	const target = new Date(`${dateText}T00:00:00.000Z`);
	return Math.floor((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

const violations = [];
for (const [path, lines] of overThreshold) {
	const entry = entryByPath.get(path);
	if (!entry) {
		violations.push({ path, lines, kind: 'unlisted' });
		continue;
	}
	const cap = Number(entry.maxLines ?? threshold);
	if (lines > cap) {
		violations.push({ path, lines, kind: 'over-cap', cap });
	}
}

const soonToExpire = entries
	.map((entry) => ({ ...entry, daysLeft: toDaysLeft(entry.expiresOn) }))
	.filter((entry) => entry.daysLeft <= thresholdDays)
	.sort((a, b) => a.daysLeft - b.daysLeft);

const unusedEntries = entries.filter((entry) => {
	const p = toUnix(entry.path);
	const lines = lineCounts.get(p);
	if (lines === undefined) return true;
	return lines <= threshold;
});

const byOwner = entries.reduce((acc, entry) => {
	const owner = entry.owner || 'unknown';
	acc[owner] = (acc[owner] ?? 0) + 1;
	return acc;
}, {});

console.log('\n=== Decomposition threshold report (REF-PREM-01) ===');
console.log(`Threshold (lines): ${threshold}`);
console.log(`Scan roots: ${SCAN_ROOTS.join(', ')}`);
console.log(`Files scanned (ts/tsx, no tests/stories): ${scanned.length}`);
console.log(`Over threshold (${threshold}): ${overThreshold.length}`);
console.log(`Allowlist entries: ${entries.length} (maxAllowedCount: ${maxAllowedCount})`);

console.log('\nBy owner (allowlist):');
for (const [owner, count] of Object.entries(byOwner).sort((a, b) => b[1] - a[1])) {
	console.log(`- ${owner}: ${count}`);
}

console.log('\nLargest files over threshold:');
if (overThreshold.length === 0) {
	console.log('- none');
} else {
	for (const [path, lines] of overThreshold) {
		const entry = entryByPath.get(path);
		const tag = entry ? `(allowlist maxLines=${entry.maxLines ?? '—'})` : '(unlisted)';
		console.log(`- ${lines} lines ${tag} — ${path}`);
	}
}

console.log('\nViolations (must fix or allowlist with expiry):');
if (violations.length === 0) {
	console.log('- none');
} else {
	for (const v of violations) {
		if (v.kind === 'unlisted') {
			console.log(`- UNLISTED ${v.lines} lines — ${v.path}`);
		} else {
			console.log(`- OVER_CAP ${v.lines} lines (cap ${v.cap}) — ${v.path}`);
		}
	}
}

console.log('\nNear expiry (allowlist):');
if (soonToExpire.length === 0) {
	console.log('- none');
} else {
	for (const entry of soonToExpire) {
		console.log(`- ${entry.path} | owner=${entry.owner} | expires=${entry.expiresOn} | daysLeft=${entry.daysLeft}`);
	}
}

console.log('\nUnused allowlist entries (file missing or now ≤ threshold):');
if (unusedEntries.length === 0) {
	console.log('- none');
} else {
	for (const entry of unusedEntries) {
		console.log(`- ${entry.path} | owner=${entry.owner}`);
	}
}

if (entries.length > maxAllowedCount) {
	console.error('\nAllowlist count exceeded maxAllowedCount. Reduce entries before merge.');
	process.exit(1);
}

if (failOnViolations && violations.length > 0) {
	console.error('\nDecomposition violations present.');
	process.exit(1);
}

if (failOnNearExpiry && soonToExpire.length > 0) {
	console.error('\nFound near-expiry decomposition allowlist entries.');
	process.exit(1);
}

if (failOnUnused && unusedEntries.length > 0) {
	console.error('\nFound unused decomposition allowlist entries.');
	process.exit(1);
}
