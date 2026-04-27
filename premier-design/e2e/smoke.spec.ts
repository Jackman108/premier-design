import { expect, test, type Page } from '@playwright/test';

/** `networkidle/load` в dev с HMR/iframe часто флейковы — используем domcontentloaded + готовность main. */
const settlePage = async (page: Page) => {
	await page.waitForLoadState('domcontentloaded');
	await expect(page.getByRole('main')).toBeVisible({ timeout: 15_000 });
};

const gotoWithRetry = async (page: Page, path: string, attempts = 3) => {
	let lastError: unknown;
	for (let attempt = 1; attempt <= attempts; attempt += 1) {
		try {
			const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
			expect(response?.ok(), `HTTP status failed for ${path} on attempt ${attempt}`).toBeTruthy();
			await settlePage(page);
			return;
		} catch (error) {
			lastError = error;
			if (attempt < attempts) {
				await page.waitForTimeout(750 * attempt);
			}
		}
	}
	throw lastError ?? new Error(`Navigation failed for ${path}`);
};

const HYDRATION_PATTERNS = [/hydration/i, /did not match/i, /server-rendered html/i];

const assertNoHydrationWarnings = (messages: string[], route: string) => {
	const hit = messages.find((message) => HYDRATION_PATTERNS.some((pattern) => pattern.test(message)));
	expect(hit, `Hydration warning detected on route ${route}`).toBeUndefined();
};

const CONSOLE_FUNNEL_ERROR_PATTERNS = [/uncaught/i, /typeerror/i, /hydration/i, /dialogcontent/i];
const DEV_SERVER_NOISE_PATTERNS = [
	/\[hmr\]\s*invalid message/i,
	/handlestaticindicator/i,
	/cannot read properties of undefined \(reading 'components'\)/i,
];

test('@core home page smoke', async ({ page }) => {
	await gotoWithRetry(page, '/');

	await expect(page).toHaveURL(/\/$/);
	await expect(page.getByRole('button', { name: 'Сделать заказ' }).first()).toBeVisible();
});

test('@extended portfolio page smoke', async ({ page }) => {
	for (const path of ['/portfolio']) {
		await gotoWithRetry(page, path);
		await expect(page.getByRole('main').getByRole('heading', { level: 1 }).first()).toBeVisible();
	}
});

test('@core service page smoke', async ({ page }) => {
	// Категория услуг не вынесена отдельной ссылкой с именем «Строительная экспертиза» в главном меню (aria — «Перейти к разделу …»).
	await gotoWithRetry(page, '/services/expertise');
	await expect(page).toHaveURL(/\/services\/expertise\/?$/);
});

test('@core feedback api method-guard smoke', async ({ request }) => {
	const response = await request.fetch('/api/feedback', {
		method: 'GET',
	});
	expect(response.status()).toBe(405);
	const body = await response.json();
	expect(body.message).toContain('Method not allowed');
});

test('@extended photo viewer opens and closes from home examples', async ({ page }) => {
	await page.addInitScript(() => {
		window.localStorage.setItem('cookiesAccepted', 'true');
	});
	await gotoWithRetry(page, '/');

	const examples = page.locator('#home-examples');
	await expect(examples).toBeVisible();
	await examples.getByRole('button').first().click({ force: true });

	const viewer = page.locator('dialog[open][aria-label="Просмотр изображений"]');
	await expect(viewer).toHaveCount(1);
	await expect(viewer.locator('img').first()).toBeAttached();

	await page.keyboard.press('Escape');
	await expect(viewer).toHaveCount(0);
});

test('@extended no hydration warnings on key pages', async ({ page }) => {
	const routes = ['/', '/about', '/contacts', '/portfolio'];

	for (const route of routes) {
		const messages: string[] = [];
		const runtimeErrors: string[] = [];
		page.removeAllListeners('console');
		page.removeAllListeners('pageerror');
		page.on('console', (msg) => {
			if (msg.type() === 'error' || msg.type() === 'warning') {
				messages.push(msg.text());
			}
		});
		page.on('pageerror', (error) => {
			runtimeErrors.push(error.message);
		});

		await gotoWithRetry(page, route);

		assertNoHydrationWarnings(messages, route);
		assertNoHydrationWarnings(runtimeErrors, route);
	}
});

test('@extended mobile key pages have no horizontal overflow', async ({ page }) => {
	const widths = [320, 360, 390, 414];
	const routes = ['/', '/about', '/contacts'];

	for (const width of widths) {
		await page.setViewportSize({ width, height: 844 });
		for (const route of routes) {
			await gotoWithRetry(page, route);
			const hasOverflow = await page.evaluate(() => {
				return document.documentElement.scrollWidth > window.innerWidth;
			});
			expect(hasOverflow, `Horizontal overflow detected on ${route} at width ${width}`).toBe(false);
		}
	}
});

test('@extended mobile key controls keep min tap target size', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await gotoWithRetry(page, '/');

	const primaryOrderButton = page.getByRole('button', { name: 'Сделать заказ' }).first();
	await expect(primaryOrderButton).toBeVisible();
	const orderBox = await primaryOrderButton.boundingBox();
	expect(orderBox?.width ?? 0).toBeGreaterThanOrEqual(40);
	expect(orderBox?.height ?? 0).toBeGreaterThanOrEqual(40);

	const menuButton = page.getByRole('button', { name: 'Открыть или закрыть меню' }).first();
	await expect(menuButton).toBeVisible();
	const menuBox = await menuButton.boundingBox();
	expect(menuBox?.width ?? 0).toBeGreaterThanOrEqual(40);
	expect(menuBox?.height ?? 0).toBeGreaterThanOrEqual(40);
});

test('@extended critical pages expose basic a11y landmarks', async ({ page }) => {
	const routes = ['/', '/about', '/contacts'];
	for (const route of routes) {
		await gotoWithRetry(page, route);
		await expect(page.getByRole('main')).toBeVisible();
		await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
	}
});

test('@extended contacts map iframe loads without CSP frame violations', async ({ page }) => {
	const messages: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error' || msg.type() === 'warning') {
			messages.push(msg.text());
		}
	});

	await gotoWithRetry(page, '/contacts');

	const mapFrame = page.frameLocator('iframe[title="Карта офиса Premium Design"]');
	await expect(mapFrame.locator('body')).toBeVisible();

	const cspFrameError = messages.find((message) =>
		/content security policy|framing .* violates/i.test(message),
	);
	expect(cspFrameError, 'CSP frame warning detected on contacts map').toBeUndefined();
});

test('@core lead modal opens from hero CTA', async ({ page }) => {
	await page.addInitScript(() => {
		window.localStorage.setItem('cookiesAccepted', 'true');
	});
	await gotoWithRetry(page, '/');

	const heroOrderButton = page.getByRole('button', { name: 'Сделать заказ' }).first();
	await expect(heroOrderButton).toBeVisible();
	// В dev Next может показывать индикатор поверх UI (`nextjs-portal` перехватывает клики).
	await heroOrderButton.click({ force: true });
	await expect(page.getByRole('textbox', { name: 'Телефон' })).toBeVisible();
});

test('@extended feedback form submit shows success state and keeps console clean', async ({ page }) => {
	const consoleMessages: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error' || msg.type() === 'warning') {
			consoleMessages.push(msg.text());
		}
	});
	await page.addInitScript(() => {
		window.localStorage.setItem('cookiesAccepted', 'true');
	});

	await page.route('**/api/feedback', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ status: 'success', message: 'ok' }),
		});
	});

	await gotoWithRetry(page, '/');
	await page.getByRole('button', { name: 'Сделать заказ' }).first().click();

	await page.getByLabel('Имя').fill('Тестовый клиент');
	await page.getByRole('textbox', { name: 'Телефон' }).fill('291112233');
	await page.getByLabel('Сообщение').fill('Проверка smoke-сценария');
	const consentCheckbox = page.getByRole('checkbox', { name: /пользовательским соглашением/i });
	await consentCheckbox.setChecked(true, { force: true });
	await page.getByRole('button', { name: 'Отправить заявку' }).click();

	await expect(page.getByText('Заявка отправлена. Мы свяжемся с вами в ближайшее время.')).toBeVisible();

	const consoleHit = consoleMessages.find((message) =>
		CONSOLE_FUNNEL_ERROR_PATTERNS.some((pattern) => pattern.test(message))
		&& !DEV_SERVER_NOISE_PATTERNS.some((pattern) => pattern.test(message)),
	);
	expect(consoleHit, 'Unexpected console issue in lead funnel').toBeUndefined();
});
