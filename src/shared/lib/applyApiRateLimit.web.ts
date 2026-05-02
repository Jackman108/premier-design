import type { RateLimitOptions } from '@shared/lib/rateLimit';
import { checkRateLimit } from '@shared/lib/rateLimit';

const normalizeForwardedIp = (xff: string): string => {
	const first = xff.split(',')[0]?.trim();
	return first ?? '';
};

/** IP для rate limit при входе `Request` (Route Handler App Router). */
export const getClientIpFromWebRequest = (request: Request): string => {
	const trustForwarded = process.env.RATE_LIMIT_TRUST_FORWARDED_FOR === '1';
	if (trustForwarded) {
		const xff = request.headers.get('x-forwarded-for');
		if (typeof xff === 'string' && xff.trim()) {
			const ip = normalizeForwardedIp(xff);
			if (ip) {
				return ip.replace(/^::ffff:/u, '').trim();
			}
		}
	}

	const real = request.headers.get('x-real-ip');
	if (typeof real === 'string' && real.trim()) {
		return real.replace(/^::ffff:/u, '').trim();
	}

	return 'unknown';
};

export const applyApiRateLimitWeb = (
	request: Request,
	scope: string,
	options: RateLimitOptions,
): { allowed: boolean; limitHeaders: Record<string, string> } => {
	const clientIp = getClientIpFromWebRequest(request);
	const result = checkRateLimit(`${scope}:${clientIp}`, options);

	const limitHeaders: Record<string, string> = {
		'X-RateLimit-Limit': String(result.limit ?? options.maxRequests),
		'X-RateLimit-Remaining': String(result.remaining),
		'X-RateLimit-Reset': String(result.resetAtUnixSec ?? 0),
		'Retry-After': String(result.retryAfterSec),
	};

	return { allowed: result.allowed, limitHeaders };
};
