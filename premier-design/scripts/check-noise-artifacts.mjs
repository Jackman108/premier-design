import {existsSync, lstatSync, readdirSync} from 'node:fs';
import {join, resolve, relative} from 'node:path';

const cwd = process.cwd();
const args = process.argv.slice(2);
const useAll = args.includes('--all');

const FORBIDDEN_PATH_PARTS = [
	'.next/dev/cache',
	'playwright-report',
	'test-results',
	'blob-report',
	'storybook-static',
];

const FORBIDDEN_FILE_PATTERNS = [/\.DS_Store$/i, /\.log$/i, /\.tmp$/i];
const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'coverage', 'storybook-static', 'playwright-report', 'test-results', 'blob-report']);
const FORBIDDEN_DIRS = ['storybook-static', 'playwright-report', 'test-results', 'blob-report'];

const toUnix = (value) => value.split('\\').join('/');

const hasForbiddenPathPart = (file) => {
	const normalized = toUnix(file);
	return FORBIDDEN_PATH_PARTS.some((part) => normalized.includes(part));
};

const hasForbiddenFilePattern = (file) => FORBIDDEN_FILE_PATTERNS.some((pattern) => pattern.test(file));

const walk = (dir, out) => {
	for (const entry of readdirSync(dir, {withFileTypes: true})) {
		const absolute = join(dir, entry.name);
		const rel = toUnix(relative(cwd, absolute));
		if (entry.isDirectory()) {
			if (IGNORED_DIRS.has(entry.name)) {
				continue;
			}
			walk(absolute, out);
			continue;
		}
		out.push(rel);
	}
};

const filesToCheck = (() => {
	if (useAll) {
		const all = [];
		walk(cwd, all);
		return all;
	}
	return args.filter(Boolean).map((file) => toUnix(file));
})();

const violations = [];

for (const folder of FORBIDDEN_DIRS) {
	if (existsSync(resolve(cwd, folder))) {
		violations.push(`${folder}: директория должна быть удалена из workspace перед релизом/коммитом.`);
	}
}

if (existsSync(resolve(cwd, '.next/dev/cache'))) {
	violations.push('.next/dev/cache: dev-кеш должен быть очищен перед релизом/коммитом.');
}

for (const file of filesToCheck) {
	const absolute = resolve(cwd, file);
	if (!existsSync(absolute)) {
		continue;
	}
	if (lstatSync(absolute).isDirectory()) {
		continue;
	}

	if (hasForbiddenPathPart(file)) {
		violations.push(`${file}: шумовой артефакт не должен попадать в коммит.`);
	}

	if (hasForbiddenFilePattern(file)) {
		violations.push(`${file}: запрещённый временный/лог-файл в коммите.`);
	}
}

if (violations.length > 0) {
	console.error('\nNoise artifact check failed:\n');
	for (const item of violations) {
		console.error(`- ${item}`);
	}
	process.exit(1);
}

console.log(`Noise artifact check passed (${filesToCheck.length} file(s)).`);
