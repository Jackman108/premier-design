import { expect, test, type Page } from '@playwright/test';

const gotoReady = async (page: Page, path: string) => {
	const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
	expect(response?.ok(), `HTTP status failed for ${path}`).toBeTruthy();
	await expect(page.getByRole('main')).toBeVisible({ timeout: 15_000 });
};

test('@extended visual cards keep unified depth tokens', async ({ page }) => {
	await gotoReady(page, '/repairs');
	const styledCardsCount = await page.evaluate(() => {
		const nodes = Array.from(document.querySelectorAll<HTMLElement>('[class*="card"]'));
		return nodes.filter((node) => {
			const style = getComputedStyle(node);
			return style.boxShadow !== 'none' && parseFloat(style.borderTopWidth || '0') >= 1;
		}).length;
	});
	expect(styledCardsCount).toBeGreaterThanOrEqual(2);
});

test('@extended visual dark mode keeps media overlays readable', async ({ page }) => {
	await page.addInitScript(() => {
		document.documentElement.setAttribute('data-theme', 'dark');
	});

	await gotoReady(page, '/portfolio');
	const offerTextColor = await page
		.locator('[class*="offer__text"]')
		.first()
		.evaluate((node) => {
			const style = getComputedStyle(node as HTMLElement);
			return {
				textColor: style.color,
				backgroundColor: style.backgroundColor,
			};
		});

	expect(offerTextColor.textColor).not.toBe(offerTextColor.backgroundColor);
	expect(offerTextColor.textColor).not.toContain('0, 0, 0');
});
