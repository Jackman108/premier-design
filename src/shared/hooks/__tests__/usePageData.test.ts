/** @jest-environment node */
import { SITE_PUBLIC_ORIGIN } from '@shared/constants/company';
import { selectAppealSectionData, usePageData } from '@shared/hooks/usePageData';

describe('usePageData (selectPageData)', () => {
	it('resolves title, button and banner by shortTitle', () => {
		const titles = [{ shortTitle: 'page', canonical: '/path' }];
		const buttons = [{ shortTitle: 'cta' }];
		const banners = [{ shortTitle: 'hero' }];

		const result = usePageData(titles, buttons, banners, 'page', 'cta', 'hero');

		expect(result.titleItem.shortTitle).toBe('page');
		expect(result.titleItem.canonical).toBe(`${SITE_PUBLIC_ORIGIN}/path`);
		expect(result.buttonItem).toEqual({ shortTitle: 'cta' });
		expect(result.bannerItem).toEqual({ shortTitle: 'hero' });
	});

	it('uses empty objects when items are missing', () => {
		const result = usePageData([], [], [], 'x', 'y', 'z');

		expect(result.titleItem).toEqual({ canonical: '' });
		expect(result.buttonItem).toEqual({});
		expect(result.bannerItem).toEqual({});
	});

	it('leaves canonical empty when title has no canonical field', () => {
		const titles = [{ shortTitle: 'only' }];
		const result = usePageData(titles, [], [], 'only', 'b', 'c');

		expect(result.titleItem.canonical).toBe('');
	});

	it('selectAppealSectionData uses fixed appeal shortTitles', () => {
		const titles = [{ shortTitle: 'create-best-place', canonical: '/a' }];
		const buttons = [{ shortTitle: 'leave_request' }];
		const banners = [{ shortTitle: 'appeal_banner' }];

		const out = selectAppealSectionData(titles, buttons, banners);

		expect(out.titleItem.shortTitle).toBe('create-best-place');
		expect(out.buttonItem.shortTitle).toBe('leave_request');
		expect(out.bannerItem.shortTitle).toBe('appeal_banner');
	});
});
