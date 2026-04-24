/** @jest-environment node */
import {collectSitePathnames, STATIC_SITEMAP_PATHS} from '../collectSitePathnames';
import type {DataProps} from '@shared/validates/dataPropsSchema';

describe('collectSitePathnames', () => {
	it('includes static hub paths', () => {
		expect(STATIC_SITEMAP_PATHS).toContain('/services');
		expect(STATIC_SITEMAP_PATHS).toContain('/sitemap');
	});

	it('merges static, category, service detail and related URLs', () => {
		const data = {
			prices: {
				repairs: [
					{
						id: 'cat-a',
						title: 'A',
						description: '',
						image: {src: '/x.webp', alt: '', quality: 90, width: 1, height: 1},
						priceList: [{canonical: '/services/cat-a/job-one', service: 'J', unit: 'm', price: '1'}],
					},
				],
			},
			relatedServices: [{canonical: '/services/related/cleaning'}],
		} as unknown as DataProps;

		const paths = collectSitePathnames(data);
		expect(paths).toContain('/services');
		expect(paths).toContain('/sitemap');
		expect(paths).toContain('/services/cat-a');
		expect(paths).toContain('/services/cat-a/job-one');
		expect(paths).toContain('/services/related/cleaning');
	});
});
