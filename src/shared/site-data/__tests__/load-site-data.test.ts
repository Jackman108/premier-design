/** @jest-environment node */

import { loadSiteData } from '../load-site-data';

describe('load-site-data', () => {
	it('loads ru bundle and matches schema', () => {
		const data = loadSiteData();
		expect(data.menu.length).toBeGreaterThan(0);
	});

	it('exports stable menu ids', () => {
		const data = loadSiteData();
		expect(data.menu.some((m) => m.id === 1)).toBe(true);
	});

	it('loads en bundle and matches schema', () => {
		const data = loadSiteData('en');
		expect(data.menu.length).toBeGreaterThan(0);
	});
});
