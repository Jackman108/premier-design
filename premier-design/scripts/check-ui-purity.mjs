import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const cwd = process.cwd();
const args = process.argv.slice(2);
const useAll = args.includes('--all');

const ROOTS = ['features'];
const UI_FOLDER_MARKER = '/ui/';
const FILE_RE = /\.(ts|tsx|js|jsx)$/;
const FORBIDDEN_PATTERNS = [
	{ re: /\blocalStorage\b/, label: 'localStorage' },
	{ re: /\bsessionStorage\b/, label: 'sessionStorage' },
	{ re: /\bwindow\./, label: 'window.* in first render layer' },
	{ re: /\bdocument\./, label: 'document.* in first render layer' },
];

const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'coverage', 'storybook-static', 'styled-system']);
const toUnix = (value) => value.split('\\').join('/');

const walkFiles = (dir, out) => {
	const entries = readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const absolute = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (!IGNORED_DIRS.has(entry.name)) {
				walkFiles(absolute, out);
			}
			continue;
		}
		if (entry.isFile() && FILE_RE.test(entry.name) && statSync(absolute).size > 0) {
			const rel = toUnix(relative(cwd, absolute));
			if (rel.includes(UI_FOLDER_MARKER)) {
				out.push(rel);
			}
		}
	}
};

const filesToCheck = (() => {
	if (useAll) {
		const files = [];
		for (const root of ROOTS) {
			const abs = resolve(cwd, root);
			if (existsSync(abs)) {
				walkFiles(abs, files);
			}
		}
		return files;
	}
	return args.map((item) => toUnix(item)).filter((item) => FILE_RE.test(item) && item.includes(UI_FOLDER_MARKER));
})();

const violations = [];

for (const file of filesToCheck) {
	const abs = resolve(cwd, file);
	if (!existsSync(abs)) {
		continue;
	}
	const source = readFileSync(abs, 'utf-8');
	for (const { re, label } of FORBIDDEN_PATTERNS) {
		if (re.test(source)) {
			violations.push(`${file}: найдено "${label}". Вынесите логику в hooks/useCases.`);
		}
	}
}

if (violations.length > 0) {
	console.error('\nUI purity check failed:\n');
	for (const item of violations) {
		console.error(`- ${item}`);
	}
	process.exit(1);
}

console.log(`UI purity check passed (${filesToCheck.length} file(s)).`);
