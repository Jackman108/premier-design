#!/usr/bin/env node
/**
 * Готовит `.next/standalone` для запуска `node .next/standalone/server.js`.
 *
 * Next.js при `output: 'standalone'` НЕ копирует `.next/static` и `public` в `.next/standalone`,
 * это явно описано в документации (https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files).
 * Без них standalone-сервер 404-ит JS-чанки/медиа, фронт не гидрируется, e2e-клики ничего не делают.
 *
 * Скрипт идемпотентен: чистит целевые папки и копирует заново.
 */
import { existsSync, rmSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';

const cwd = process.cwd();
const standaloneRoot = resolve(cwd, '.next/standalone');

if (!existsSync(standaloneRoot)) {
	console.error(
		'[prepare-standalone] .next/standalone не найден. Сначала запустите `yarn build` (output: "standalone").',
	);
	process.exit(1);
}

const copyTargets = [
	{ src: resolve(cwd, '.next/static'), dest: resolve(standaloneRoot, '.next/static'), label: '.next/static' },
	{ src: resolve(cwd, 'public'), dest: resolve(standaloneRoot, 'public'), label: 'public' },
];

for (const { src, dest, label } of copyTargets) {
	if (!existsSync(src)) {
		console.warn(`[prepare-standalone] пропущено: ${label} (источник ${src} не найден)`);
		continue;
	}
	rmSync(dest, { recursive: true, force: true });
	cpSync(src, dest, { recursive: true });
	console.log(`[prepare-standalone] copied ${label} -> ${dest}`);
}

console.log('[prepare-standalone] готово.');
