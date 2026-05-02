import type { RateLimitOptions, RateLimitResult } from '@shared/lib/rateLimit';
import { checkRateLimit } from '@shared/lib/rateLimit';

type UpstashRestConfig = {
	url: string;
	token: string;
	keyPrefix: string;
};

async function executeUpstashCommand(config: UpstashRestConfig, command: Array<string | number>): Promise<unknown> {
	const response = await fetch(`${config.url}/`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(command),
		cache: 'no-store',
	});

	if (!response.ok) {
		const bodyText = await response.text();
		throw new Error(`Upstash command failed: ${response.status} ${bodyText}`);
	}

	const data = (await response.json()) as { result?: unknown };
	return data.result;
}

/**
 * In-memory rate limit по умолчанию; при **`RATE_LIMIT_REDIS_REST_URL`** + **`RATE_LIMIT_REDIS_REST_TOKEN`**
 * — скользящее окно через Upstash REST (паритет febcode / BP-17).
 */
export async function checkRateLimitDistributed(key: string, options: RateLimitOptions): Promise<RateLimitResult> {
	const url = process.env.RATE_LIMIT_REDIS_REST_URL ?? '';
	const token = process.env.RATE_LIMIT_REDIS_REST_TOKEN ?? '';
	const keyPrefix = process.env.RATE_LIMIT_REDIS_KEY_PREFIX ?? 'rate-limit';

	if (!url || !token) {
		return checkRateLimit(key, options);
	}

	const fullKey = `${keyPrefix}:${key}`;

	try {
		const countResult = await executeUpstashCommand({ url, token, keyPrefix }, ['INCR', fullKey]);
		const count = Number(countResult);
		if (!Number.isFinite(count)) {
			throw new Error(`Unexpected INCR result: ${String(countResult)}`);
		}

		if (count === 1) {
			await executeUpstashCommand({ url, token, keyPrefix }, ['PEXPIRE', fullKey, options.windowMs]);
		}

		const ttlResult = await executeUpstashCommand({ url, token, keyPrefix }, ['PTTL', fullKey]);
		const ttlMs = Number(ttlResult);
		const ttlSafe = Number.isFinite(ttlMs) && ttlMs > 0 ? ttlMs : options.windowMs;
		const resetAtUnixSec = Math.ceil((Date.now() + ttlSafe) / 1000);

		if (count > options.maxRequests) {
			return {
				allowed: false,
				remaining: 0,
				retryAfterSec: Math.max(1, Math.ceil(ttlSafe / 1000)),
				limit: options.maxRequests,
				resetAtUnixSec,
			};
		}

		return {
			allowed: true,
			remaining: Math.max(0, options.maxRequests - count),
			retryAfterSec: Math.max(1, Math.ceil(ttlSafe / 1000)),
			limit: options.maxRequests,
			resetAtUnixSec,
		};
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.warn('[rate-limit] Upstash unavailable, using in-memory fallback:', error);
		}
		return checkRateLimit(key, options);
	}
}
