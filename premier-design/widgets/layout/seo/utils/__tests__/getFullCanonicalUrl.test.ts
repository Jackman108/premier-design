import {getFullCanonicalUrl} from '../getFullCanonicalUrl';

describe('getFullCanonicalUrl', () => {
	it('prefixes site origin', () => {
		expect(getFullCanonicalUrl('/contacts')).toBe('https://premium-interior.by/contacts');
	});

	it('handles logo path', () => {
		expect(getFullCanonicalUrl('/logo.png')).toBe('https://premium-interior.by/logo.png');
	});
});
