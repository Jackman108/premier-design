import {getCanonicalPath} from '../getCanonicalPath';

describe('getCanonicalPath', () => {
	it('returns last path segment', () => {
		expect(getCanonicalPath('/services/a/b')).toBe('b');
	});

	it('returns empty for empty input', () => {
		expect(getCanonicalPath('')).toBe('');
	});

	it('handles trailing slash', () => {
		expect(getCanonicalPath('/path/to/')).toBe('');
	});
});
