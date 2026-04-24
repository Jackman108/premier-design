/** @jest-environment node */
import {SITE_PUBLIC_ORIGIN} from '@shared/constants/company';
import {getFullCanonicalUrl} from '../getFullCanonicalUrl';

describe('getFullCanonicalUrl', () => {
	it('prefixes path with site origin', () => {
		expect(getFullCanonicalUrl('/contacts')).toBe(`${SITE_PUBLIC_ORIGIN}/contacts`);
	});

	it('works for asset paths', () => {
		expect(getFullCanonicalUrl('/logo.png')).toBe(`${SITE_PUBLIC_ORIGIN}/logo.png`);
	});
});
