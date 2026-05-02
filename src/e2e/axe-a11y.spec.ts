import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const seriousOrCritical = (impact: string | null | undefined) => impact === 'serious' || impact === 'critical';

test.describe('@extended a11y (axe)', () => {
	test('главная: нет нарушений axe с impact serious/critical', async ({ page }) => {
		await page.addInitScript(() => {
			window.localStorage.setItem('cookiesAccepted', 'true');
		});
		await page.goto('/');
		await expect(page.getByRole('main')).toBeVisible({ timeout: 15_000 });

		const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();

		const blocking = violations.filter((v) => seriousOrCritical(v.impact));
		expect(
			blocking,
			JSON.stringify(
				blocking.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
				null,
				2,
			),
		).toEqual([]);
	});
});
