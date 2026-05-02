/** @jest-environment node */

import { SITE_PUBLIC_ORIGIN } from '@shared/constants/company';
import { loadSiteData } from '@shared/site-data';
import { GET } from '../../app/api/sitemap/route';

jest.mock('@shared/site-data', () => ({
	DEFAULT_SITE_LOCALE: 'ru',
	loadSiteData: jest.fn(),
}));

const mockedLoadSiteData = jest.mocked(loadSiteData);

describe('/api/sitemap Route Handler', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('returns 405 for non-GET', async () => {
		const req = new Request('http://localhost/api/sitemap', { method: 'POST' });
		const res = await GET(req);
		expect(res.status).toBe(405);
	});

	it('returns xml sitemap with static and dynamic urls', async () => {
		mockedLoadSiteData.mockReturnValue({
			prices: {
				repairs: [
					{
						id: 'renovation',
						priceList: [{ canonical: '/services/renovation/flooring' }],
					},
				],
			},
			relatedServices: [{ canonical: '/services/related/cleaning' }],
		} as never);

		const req = new Request('http://localhost/api/sitemap', { method: 'GET' });
		const res = await GET(req);

		expect(res.status).toBe(200);
		expect(res.headers.get('Content-Type')).toContain('application/xml');

		const payload = await res.text();
		expect(payload).toContain('<urlset');
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/design`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/portfolio`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/sitemap`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services/renovation`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services/renovation/flooring`);
		expect(payload).toContain(`${SITE_PUBLIC_ORIGIN}/services/related/cleaning`);
	});

	it('returns 500 when data structure is invalid', async () => {
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
		mockedLoadSiteData.mockImplementation(() => {
			throw new Error('schema');
		});

		const req = new Request('http://localhost/api/sitemap', { method: 'GET' });
		const res = await GET(req);

		expect(res.status).toBe(500);
		const json = (await res.json()) as { success?: boolean; error?: string; errorCode?: string };
		expect(json.success).toBe(false);
		expect(json.errorCode).toBe('SITEMAP_FAILED');
		expect(json.error).toContain('sitemap');
		errorSpy.mockRestore();
	});
});
