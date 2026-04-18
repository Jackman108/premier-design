import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    // В локальном dev режиме Next HMR может шуметь при параллельных воркерах.
    // Делаем прогоны детерминированными локально и сохраняем параллельность в CI.
    workers: process.env.CI ? 4 : 1,
    fullyParallel: true,
    retries: 0,
    use: {
        baseURL: 'http://127.0.0.1:3000',
        trace: 'on-first-retry',
    },
    webServer: {
        // Для e2e используем webpack-dev: в гибридном pages/app роутере он стабильнее Turbopack по HMR.
        command: 'yarn dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: true,
        timeout: 120_000,
    },
});
