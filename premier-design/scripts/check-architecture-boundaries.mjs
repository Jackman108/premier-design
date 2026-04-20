import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import {join, relative, resolve} from 'node:path';

const cwd = process.cwd();
const args = process.argv.slice(2);
const useAllFiles = args.includes('--all');

const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'coverage', 'storybook-static', 'styled-system']);
const IMPORT_RE = /from\s+['"]([^'"]+)['"]/g;

const toUnix = (value) => value.split('\\').join('/');
const isCodeFile = (file) => /\.(ts|tsx|js|jsx)$/.test(file);
const today = new Date().toISOString().slice(0, 10);

const allowlistPath = resolve(cwd, 'scripts/architecture-allowlist.json');
if (!existsSync(allowlistPath)) {
	console.error(`Architecture boundary check failed: missing ${toUnix(relative(cwd, allowlistPath))}`);
	process.exit(1);
}

const allowlistRaw = JSON.parse(readFileSync(allowlistPath, 'utf-8'));
const allowlistEntries = Array.isArray(allowlistRaw.entries) ? allowlistRaw.entries : [];
const maxAllowedCount = Number(allowlistRaw.maxAllowedCount ?? allowlistEntries.length);

if (!Number.isFinite(maxAllowedCount) || maxAllowedCount < 0) {
	console.error('Architecture boundary check failed: invalid maxAllowedCount in architecture-allowlist.json');
	process.exit(1);
}

if (allowlistEntries.length > maxAllowedCount) {
	console.error(
		`Architecture boundary check failed: allowlist size ${allowlistEntries.length} > maxAllowedCount ${maxAllowedCount}.`,
	);
	process.exit(1);
}

const ALLOWLIST = new Map(
	allowlistEntries.map((entry) => [`${entry.source}|${entry.target}`, entry.expiresOn]),
);

const walkFiles = (dir) => {
	const entries = readdirSync(dir, {withFileTypes: true});
	const result = [];
	for (const entry of entries) {
		const abs = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!IGNORED_DIRS.has(entry.name)) {
				result.push(...walkFiles(abs));
			}
			continue;
		}
		if (entry.isFile() && isCodeFile(entry.name) && statSync(abs).size > 0) {
			result.push(toUnix(relative(cwd, abs)));
		}
	}
	return result;
};

const files = (useAllFiles ? walkFiles(cwd) : args.filter(isCodeFile))
	.map((file) => toUnix(file))
	.filter((file) => existsSync(resolve(cwd, file)));

const violations = [];

for (const file of files) {
	const source = readFileSync(resolve(cwd, file), 'utf-8');
	const imports = [...source.matchAll(IMPORT_RE)].map((m) => m[1]);
	const inShared = file.startsWith('shared/');
	const inFeature = file.startsWith('features/');
	const featureSlice = inFeature ? file.split('/')[1] : '';

	for (const target of imports) {
		const key = `${file}|${target}`;
		const allowUntil = ALLOWLIST.get(key);
		if (allowUntil && allowUntil < today) {
			violations.push(`${file}: allowlist-исключение просрочено (${allowUntil}) -> ${target}`);
			continue;
		}

		if (inShared && (target.startsWith('@features/') || target.startsWith('@services/'))) {
			if (!allowUntil) {
				violations.push(`${file}: запрещен импорт из бизнес-слоя -> ${target}`);
			}
			continue;
		}

		if (inFeature && target.startsWith('@features/')) {
			const targetSlice = target.split('/')[1] ?? '';
			if (targetSlice && targetSlice !== featureSlice && !allowUntil) {
				violations.push(`${file}: cross-feature импорт нарушает FSD -> ${target}`);
			}
		}
	}
}

if (violations.length > 0) {
	console.error('\nArchitecture boundary check failed:\n');
	for (const violation of violations) {
		console.error(`- ${violation}`);
	}
	process.exit(1);
}

console.log(`Architecture boundary check passed (${files.length} file(s)).`);
