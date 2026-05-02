/**
 * Fallback Web Vitals через Playwright (FB-R-07).
 */

export async function collectWebVitalsFallback(url) {
	const { chromium } = await import('@playwright/test');
	const launchOptions = { headless: true };
	let browser;
	try {
		browser = await chromium.launch({ ...launchOptions, channel: 'chrome' });
	} catch {
		try {
			browser = await chromium.launch({ ...launchOptions, channel: 'msedge' });
		} catch {
			browser = await chromium.launch(launchOptions);
		}
	}

	const context = await browser.newContext({
		viewport: { width: 412, height: 915 },
		deviceScaleFactor: 2,
		isMobile: true,
		hasTouch: true,
	});
	const page = await context.newPage();

	await page.addInitScript(() => {
		// @ts-ignore
		window.__perfVitals = { lcp: 0, fcp: 0, cls: 0, tbt: 0 };
		// @ts-ignore
		let clsValue = 0;

		new PerformanceObserver((entryList) => {
			const last = entryList.getEntries().at(-1);
			// @ts-ignore
			if (last) window.__perfVitals.lcp = last.startTime;
		}).observe({ type: 'largest-contentful-paint', buffered: true });

		new PerformanceObserver((entryList) => {
			const first = entryList.getEntries()[0];
			// @ts-ignore
			if (first) window.__perfVitals.fcp = first.startTime;
		}).observe({ type: 'paint', buffered: true });

		new PerformanceObserver((entryList) => {
			for (const entry of entryList.getEntries()) {
				// @ts-ignore
				if (!entry.hadRecentInput) clsValue += entry.value;
			}
			// @ts-ignore
			window.__perfVitals.cls = clsValue;
		}).observe({ type: 'layout-shift', buffered: true });

		new PerformanceObserver((entryList) => {
			for (const entry of entryList.getEntries()) {
				// @ts-ignore
				window.__perfVitals.tbt += Math.max(0, entry.duration - 50);
			}
		}).observe({ type: 'longtask', buffered: true });
	});

	await page.goto(url, { waitUntil: 'load', timeout: 120000 });
	await page.waitForTimeout(5000);
	const vitals = await page.evaluate(() => {
		// @ts-ignore
		return window.__perfVitals;
	});

	await context.close();
	await browser.close();
	return vitals;
}
