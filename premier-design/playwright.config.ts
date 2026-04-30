import { defineConfig } from '@playwright/test';

const isCi = Boolean(process.env.CI);

export default defineConfig({
	testDir: './e2e',
	timeout: isCi ? 90_000 : 45_000,
	// Smoke в CI должен быть детерминированным: один воркер и без конкурентных навигаций.
	workers: isCi ? 1 : 1,
	fullyParallel: false,
	retries: isCi ? 1 : 0,
	expect: {
		timeout: isCi ? 10_000 : 7_000,
	},
	use: {
		baseURL: 'http://127.0.0.1:3000',
		trace: 'on-first-retry',
		navigationTimeout: isCi ? 45_000 : 20_000,
		actionTimeout: isCi ? 15_000 : 10_000,
	},
	webServer: {
		// CI: standalone-сервер после `yarn build` (`output: 'standalone'` — `next start` не поддерживается).
		// `start:standalone` сначала копирует `.next/static` и `public` в `.next/standalone`
		// (Next их не копирует автоматически — без этого 404-ит JS-чанки и фронт не гидрируется).
		// Local: dev для быстрого цикла.
		command: isCi ? 'yarn start:standalone' : 'yarn dev',
		url: 'http://127.0.0.1:3000',
		reuseExistingServer: !isCi,
		timeout: isCi ? 180_000 : 120_000,
		...(isCi && {
			env: {
				PORT: '3000',
				HOSTNAME: '127.0.0.1',
			},
		}),
	},
});
