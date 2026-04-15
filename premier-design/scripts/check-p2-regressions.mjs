import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';

const HEX_COLOR_PATTERN = /(^|[^\w-])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;
const HOVER_PATTERN = /:hover\b/;
const FOCUS_PATTERN = /:focus-visible\b|:focus-within\b/;

const cwd = process.cwd();
const args = process.argv.slice(2);
const useAllFiles = args.includes('--all');

const toAbsolutePath = (file) => (file ? resolve(cwd, file) : '');
const toUnixPath = (file) => file.split('\\').join('/');
const isCssFile = (file) => file.endsWith('.css');
const isTokensFile = (file) => toUnixPath(file).endsWith('/styles/tokens.css');

const IGNORED_DIRS = new Set(['node_modules', '.git', '.next', 'coverage', 'storybook-static']);
const LEGACY_HEX_ALLOWLIST = new Set([]);
const LEGACY_FOCUS_ALLOWLIST = new Set([]);

const walkCssFiles = (dir) => {
	const entries = readdirSync(dir, { withFileTypes: true });
	const result = [];

	for (const entry of entries) {
		if (entry.isDirectory()) {
			if (IGNORED_DIRS.has(entry.name)) {
				continue;
			}
			result.push(...walkCssFiles(join(dir, entry.name)));
			continue;
		}

		if (entry.isFile() && entry.name.endsWith('.css')) {
			const absolutePath = join(dir, entry.name);
			const stats = statSync(absolutePath);
			if (stats.size > 0) {
				result.push(relative(cwd, absolutePath));
			}
		}
	}

	return result;
};

const getInputFiles = () => {
	if (useAllFiles) {
		return walkCssFiles(cwd);
	}
	return args.filter((file) => isCssFile(file));
};

const filesToCheck = getInputFiles()
	.map((file) => toAbsolutePath(file))
	.filter((file) => existsSync(file) && isCssFile(file));

if (filesToCheck.length === 0) {
	process.exit(0);
}

const violations = [];

for (const absoluteFile of filesToCheck) {
	const raw = readFileSync(absoluteFile, 'utf-8');
	const relativeFile = toUnixPath(relative(cwd, absoluteFile));

	if (!isTokensFile(absoluteFile) && HEX_COLOR_PATTERN.test(raw) && !LEGACY_HEX_ALLOWLIST.has(relativeFile)) {
		violations.push(
			`${relativeFile}: найден "сырой" hex-цвет. Используйте CSS-токены из styles/tokens.css.`,
		);
	}

	const hasHover = HOVER_PATTERN.test(raw);
	const hasFocus = FOCUS_PATTERN.test(raw);
	if (hasHover && !hasFocus && !LEGACY_FOCUS_ALLOWLIST.has(relativeFile)) {
		violations.push(
			`${relativeFile}: есть :hover, но нет :focus-visible/:focus-within для клавиатурной доступности.`,
		);
	}
}

if (violations.length > 0) {
	console.error('\nP2 regression check failed:\n');
	for (const violation of violations) {
		console.error(`- ${violation}`);
	}
	process.exit(1);
}

console.log(`P2 regression check passed (${filesToCheck.length} file(s)).`);
