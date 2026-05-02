import { defineConfig } from '@playwright/test';

const isCi = Boolean(process.env.CI);
/** Только GitHub Actions: standalone + обязательные prod-env (локально `CI=1` ≠ Actions — иначе падает `validateStartupEnv`). */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
	testDir: './src/e2e',
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
		// GitHub Actions: standalone после `yarn build`. Локально: чистим `.next`, иначе Turbopack часто оставляет бандл без `NEXT_PUBLIC_PLAYWRIGHT_WEB_E2E` (keen `loop` + клоны).
		// `cross-env` — гарантированная подстановка env в дочерний Node на Windows; `start:standalone` копирует static в standalone.
		command: isGithubActions
			? 'yarn start:standalone'
			: `node -e "try{require('fs').rmSync('.next',{recursive:true,force:true})}catch(e){}" && cross-env NEXT_PUBLIC_PLAYWRIGHT_WEB_E2E=1 yarn dev`,
		url: 'http://127.0.0.1:3000',
		// Не reuse: иначе подцепляется чужой `yarn dev` без `NEXT_PUBLIC_PLAYWRIGHT_WEB_E2E` (keen `loop` + клоны слайдов ломают e2e).
		reuseExistingServer: false,
		timeout: isGithubActions ? 180_000 : 120_000,
		env: {
			// Отключает `loop` у keen-slider (`useSliderState`) — иначе первый `.keen-slider__slide` часто клон без обработчиков React.
			NEXT_PUBLIC_PLAYWRIGHT_WEB_E2E: '1',
			...(isGithubActions
				? {
						PORT: '3000',
						HOSTNAME: '127.0.0.1',
						TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? 'e2e_placeholder',
						TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID ?? '000000000',
					}
				: {}),
		},
	},
});
