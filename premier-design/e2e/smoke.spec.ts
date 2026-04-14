import {expect, test} from '@playwright/test';

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
