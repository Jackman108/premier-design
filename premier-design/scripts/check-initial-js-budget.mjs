/**
 * Бюджет размера initial JS для главной `/` по данным `next build` (build-manifest).
 * Суммирует размер `.js` чанков из манифеста — грубый, но стабильный gate без браузера.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const NEXT_DIR = path.join(ROOT, '.next');
const BUILD_MANIFEST_PATH = path.join(NEXT_DIR, 'build-manifest.json');
const HOME_ROUTE = '/';
// Дефолт под текущий бандл; сужать через INITIAL_JS_BUDGET_KB в CI при оптимизациях.
const DEFAULT_BUDGET_KB = 750;
const budgetKb = Number(process.env.INITIAL_JS_BUDGET_KB ?? DEFAULT_BUDGET_KB);

const toKb = (bytes) => Number((bytes / 1024).toFixed(2));

if (!fs.existsSync(BUILD_MANIFEST_PATH)) {
	console.error('::error::Нет build-manifest.json — выполните yarn build перед проверкой.');
	process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));
const pageChunks = manifest?.pages?.[HOME_ROUTE];

if (!Array.isArray(pageChunks) || pageChunks.length === 0) {
	console.error(`::error::В манифесте нет чанков для маршрута "${HOME_ROUTE}".`);
	process.exit(1);
}

const jsChunks = pageChunks.filter((entry) => entry.endsWith('.js'));
const totalBytes = jsChunks.reduce((acc, relPath) => {
	const absolutePath = path.join(NEXT_DIR, relPath);
	if (!fs.existsSync(absolutePath)) {
		console.error(`::error::Нет файла чанка: ${relPath}`);
		process.exit(1);
	}
	return acc + fs.statSync(absolutePath).size;
}, 0);

const totalKb = toKb(totalBytes);
if (totalKb > budgetKb) {
	console.error(`::error::Initial JS для "${HOME_ROUTE}": ${totalKb} KB > лимит ${budgetKb} KB`);
	process.exit(1);
}

console.log('');
console.log('=== Initial JS (главная `/`) ===');
console.log(`  Сумма .js чанков: ${totalKb} KB (лимит ≤ ${budgetKb} KB)`);
console.log(`  Число чанков: ${jsChunks.length}`);
console.log('');
