import { checkRateLimit, resetRateLimitBuckets } from '../rateLimit';

describe('checkRateLimit', () => {
	const options = { windowMs: 60_000, maxRequests: 2 };

	beforeEach(() => {
		resetRateLimitBuckets();
		jest.restoreAllMocks();
	});

	it('allows requests within limit', () => {
		const first = checkRateLimit('client-1', options);
		const second = checkRateLimit('client-1', options);

		expect(first.allowed).toBe(true);
		expect(second.allowed).toBe(true);
		expect(second.remaining).toBe(0);
	});

	it('blocks request after limit is reached', () => {
		checkRateLimit('client-2', options);
		checkRateLimit('client-2', options);
		const third = checkRateLimit('client-2', options);

		expect(third.allowed).toBe(false);
		expect(third.remaining).toBe(0);
		expect(third.retryAfterSec).toBeGreaterThan(0);
	});

	it('resets bucket after time window ends', () => {
		const nowSpy = jest.spyOn(Date, 'now');
		nowSpy.mockReturnValue(1_000);
		checkRateLimit('client-3', options);
		checkRateLimit('client-3', options);

		nowSpy.mockReturnValue(1_000 + options.windowMs + 1);
		const afterWindow = checkRateLimit('client-3', options);

		expect(afterWindow.allowed).toBe(true);
		expect(afterWindow.remaining).toBe(options.maxRequests - 1);
	});
});
