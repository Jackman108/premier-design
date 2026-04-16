import {expect, test} from '@playwright/test';

const HYDRATION_PATTERNS = [/hydration/i, /did not match/i, /server-rendered html/i];

const assertNoHydrationWarnings = (messages: string[], route: string) => {
	const hit = messages.find((message) => HYDRATION_PATTERNS.some((pattern) => pattern.test(message)));
	expect(hit, `Hydration warning detected on route ${route}`).toBeUndefined();
};

test('home page smoke', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('button', {name: 'Сделать заказ'}).first()).toBeVisible();
});

test('service page smoke', async ({page}) => {
    await page.goto('/');
    await page.getByRole('link', {name: /Строительная экспертиза/}).first().click();
    await expect(page).toHaveURL(/\/services\/expertise\/?$/);
});

test('feedback api method-guard smoke', async ({request}) => {
    const response = await request.fetch('/api/feedback', {
        method: 'GET',
    });
    expect(response.status()).toBe(405);
    const body = await response.json();
    expect(body.message).toContain('Method not allowed');
});

test('no hydration warnings on key pages', async ({page}) => {
	const routes = ['/', '/about', '/contacts'];

	for (const route of routes) {
		const messages: string[] = [];
		page.removeAllListeners('console');
		page.on('console', (msg) => {
			if (msg.type() === 'error' || msg.type() === 'warning') {
				messages.push(msg.text());
			}
		});

		const response = await page.goto(route);
		expect(response?.ok()).toBeTruthy();
		await page.waitForLoadState('networkidle');

		assertNoHydrationWarnings(messages, route);
	}
});

test('mobile key pages have no horizontal overflow', async ({page}) => {
	const widths = [320, 360, 390, 414];
	const routes = ['/', '/about', '/contacts'];

	for (const width of widths) {
		await page.setViewportSize({width, height: 844});
		for (const route of routes) {
			await page.goto(route);
			await page.waitForLoadState('networkidle');
			const hasOverflow = await page.evaluate(() => {
				return document.documentElement.scrollWidth > window.innerWidth;
			});
			expect(hasOverflow, `Horizontal overflow detected on ${route} at width ${width}`).toBe(false);
		}
	}
});

test('mobile key controls keep min tap target size', async ({page}) => {
	await page.setViewportSize({width: 390, height: 844});
	await page.goto('/');
	await page.waitForLoadState('networkidle');

	const primaryOrderButton = page.getByRole('button', {name: 'Сделать заказ'}).first();
	await expect(primaryOrderButton).toBeVisible();
	const orderBox = await primaryOrderButton.boundingBox();
	expect(orderBox?.width ?? 0).toBeGreaterThanOrEqual(40);
	expect(orderBox?.height ?? 0).toBeGreaterThanOrEqual(40);

	const menuButton = page.getByRole('button', {name: 'Открыть или закрыть меню'}).first();
	await expect(menuButton).toBeVisible();
	const menuBox = await menuButton.boundingBox();
	expect(menuBox?.width ?? 0).toBeGreaterThanOrEqual(40);
	expect(menuBox?.height ?? 0).toBeGreaterThanOrEqual(40);
});

test('critical pages expose basic a11y landmarks', async ({page}) => {
	const routes = ['/', '/about', '/contacts'];
	for (const route of routes) {
		await page.goto(route);
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('main')).toBeVisible();
		await expect(page.getByRole('heading', {level: 1}).first()).toBeVisible();
	}
});

test('contacts map iframe loads without CSP frame violations', async ({page}) => {
	const messages: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error' || msg.type() === 'warning') {
			messages.push(msg.text());
		}
	});

	await page.goto('/contacts');
	await page.waitForLoadState('networkidle');

	const mapFrame = page.frameLocator('iframe[title="Карта офиса Premier Design"]');
	await expect(mapFrame.locator('body')).toBeVisible();

	const cspFrameError = messages.find((message) =>
		/content security policy|framing .* violates/i.test(message),
	);
	expect(cspFrameError, 'CSP frame warning detected on contacts map').toBeUndefined();
});
