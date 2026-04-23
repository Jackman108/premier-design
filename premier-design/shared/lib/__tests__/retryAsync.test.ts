import {isRetryableIntegrationError, retryAsync} from '../retryAsync';

describe('retryAsync', () => {
	it('retries transient error and resolves on second attempt', async () => {
		let attempts = 0;
		const result = await retryAsync(async () => {
			attempts += 1;
			if (attempts === 1) {
				throw new Error('ETIMEDOUT');
			}
			return 'ok';
		}, {
			maxAttempts: 2,
			baseDelayMs: 1,
		});

		expect(result).toBe('ok');
		expect(attempts).toBe(2);
	});

	it('does not retry non-retryable errors', async () => {
		let attempts = 0;
		await expect(retryAsync(async () => {
			attempts += 1;
			throw new Error('validation failed');
		}, {
			maxAttempts: 3,
			baseDelayMs: 1,
		})).rejects.toThrow('validation failed');

		expect(attempts).toBe(1);
	});
});

describe('isRetryableIntegrationError', () => {
	it('detects transient network errors', () => {
		expect(isRetryableIntegrationError(new Error('ECONNRESET'))).toBe(true);
		expect(isRetryableIntegrationError(new Error('HTTP 502'))).toBe(true);
		expect(isRetryableIntegrationError(new Error('timeout'))).toBe(true);
	});

	it('ignores business validation errors', () => {
		expect(isRetryableIntegrationError(new Error('email is invalid'))).toBe(false);
	});
});
