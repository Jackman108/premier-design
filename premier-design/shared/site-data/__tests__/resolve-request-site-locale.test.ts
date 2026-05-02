import { resolveRequestSiteLocale } from '../resolve-request-site-locale';

const mockCookies = jest.fn();

jest.mock('next/headers', () => ({
	cookies: () => mockCookies(),
}));

describe('resolveRequestSiteLocale', () => {
	beforeEach(() => {
		mockCookies.mockReset();
	});

	it('returns default when cookie is missing', async () => {
		mockCookies.mockReturnValue({ get: () => undefined });
		await expect(resolveRequestSiteLocale()).resolves.toBe('ru');
	});

	it('returns en when cookie is valid', async () => {
		mockCookies.mockReturnValue({ get: () => ({ value: 'en' }) });
		await expect(resolveRequestSiteLocale()).resolves.toBe('en');
	});

	it('returns default for invalid cookie value', async () => {
		mockCookies.mockReturnValue({ get: () => ({ value: 'de' }) });
		await expect(resolveRequestSiteLocale()).resolves.toBe('ru');
	});
});
