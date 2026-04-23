type RetryOptions = {
	maxAttempts: number;
	baseDelayMs: number;
	isRetryable?: (error: unknown) => boolean;
};

const wait = (ms: number): Promise<void> =>
	new Promise((resolve) => {
		setTimeout(resolve, ms);
	});

export const isRetryableIntegrationError = (error: unknown): boolean => {
	const message = error instanceof Error ? error.message : String(error ?? '');
	return /(ETIMEDOUT|ECONNRESET|EAI_AGAIN|ENOTFOUND|socket hang up|429|5\d\d|timeout)/i.test(message);
};

export const retryAsync = async <T>(task: () => Promise<T>, options: RetryOptions): Promise<T> => {
	const {
		maxAttempts,
		baseDelayMs,
		isRetryable = isRetryableIntegrationError,
	} = options;

	let lastError: unknown;
	for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
		try {
			return await task();
		} catch (error) {
			lastError = error;
			if (attempt >= maxAttempts || !isRetryable(error)) {
				throw error;
			}
			await wait(baseDelayMs * attempt);
		}
	}
	throw lastError ?? new Error('Retry failed with unknown error');
};
