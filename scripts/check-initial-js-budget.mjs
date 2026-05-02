/**
 * Бюджет размера initial JS по данным `next build` (build-manifest.json).
 * Pages Router: суммирует `.js` для маршрута `/` из `pages['/']`.
 * App Router (Next 15+): в корневом манифесте часто нет per-route чанков — берём
 * оболочку первой загрузки: `polyfillFiles` + `rootMainFiles` (стабильный gate без браузера).
 */
import fs from 'node:fs';
import path from 'node:path';

const NEXT_DIR = path.join(process.cwd(), '.next');
const BUILD_MANIFEST_PATH = path.join(NEXT_DIR, 'build-manifest.json');
const HOME_ROUTE = '/';
// Дефолт под текущий бандл; сужать через INITIAL_JS_BUDGET_KB в CI при оптимизациях.
const DEFAULT_BUDGET_KB = 750;
const budgetKb = Number(process.env.INITIAL_JS_BUDGET_KB ?? DEFAULT_BUDGET_KB);
/** Per-chunk ceiling (BP-02). `0` или пусто — не проверять. */
const maxChunkKb = Number(process.env.INITIAL_JS_MAX_CHUNK_KB ?? 0);

const toKb = (bytes) => Number((bytes / 1024).toFixed(2));

if (!fs.existsSync(BUILD_MANIFEST_PATH)) {
	console.error('::error::Нет build-manifest.json — выполните yarn build перед проверкой.');
	process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_PATH, 'utf8'));

/** @returns {{ relPaths: string[], mode: 'pages-home' | 'app-shell' }} */
function resolveChunkRelPaths() {
	const pages = manifest?.pages ?? {};
	const pageKeys = [HOME_ROUTE, '/page'];
	for (const key of pageKeys) {
		const chunks = pages[key];
		if (Array.isArray(chunks) && chunks.some((e) => typeof e === 'string' && e.endsWith('.js'))) {
			return { relPaths: chunks.filter((e) => e.endsWith('.js')), mode: 'pages-home' };
		}
	}
	const shell = [...(manifest.polyfillFiles ?? []), ...(manifest.rootMainFiles ?? [])].filter(
		(e) => typeof e === 'string' && e.endsWith('.js'),
	);
	return { relPaths: shell, mode: 'app-shell' };
}

const { relPaths: jsChunks, mode } = resolveChunkRelPaths();

if (jsChunks.length === 0) {
	console.error('::error::Не удалось определить initial JS: нет чанков ни для `/`, ни для App Router shell.');
	process.exit(1);
}

let totalBytes = 0;
const chunkSizes = [];
for (const relPath of jsChunks) {
	const absolutePath = path.join(NEXT_DIR, relPath);
	if (!fs.existsSync(absolutePath)) {
		console.error(`::error::Нет файла чанка: ${relPath}`);
		process.exit(1);
	}
	const bytes = fs.statSync(absolutePath).size;
	totalBytes += bytes;
	chunkSizes.push({ relPath, kb: toKb(bytes) });
}

const totalKb = toKb(totalBytes);
if (totalKb > budgetKb) {
	console.error(`::error::Initial JS (${mode}): ${totalKb} KB > лимит ${budgetKb} KB`);
	process.exit(1);
}

if (maxChunkKb > 0) {
	for (const { relPath, kb } of chunkSizes) {
		if (kb > maxChunkKb) {
			console.error(
				`::error::Чанк ${relPath}: ${kb} KB > per-chunk лимит ${maxChunkKb} KB (INITIAL_JS_MAX_CHUNK_KB)`,
			);
			process.exit(1);
		}
	}
}

console.log('');
console.log('=== Initial JS ===');
console.log(`  Режим: ${mode === 'app-shell' ? 'App Router (polyfills + root main)' : `Pages Router (${HOME_ROUTE})`}`);
console.log(`  Сумма .js чанков: ${totalKb} KB (лимит ≤ ${budgetKb} KB)`);
console.log(`  Число чанков: ${jsChunks.length}`);
if (maxChunkKb > 0) {
	console.log(`  Per-chunk лимит: ≤ ${maxChunkKb} KB`);
}
console.log('');
