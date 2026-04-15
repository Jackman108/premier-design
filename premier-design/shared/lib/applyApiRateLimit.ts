import type {NextApiRequest, NextApiResponse} from 'next';
import {checkRateLimit, RateLimitOptions} from '@shared/lib/rateLimit';

const getClientIp = (req: NextApiRequest): string => {
	return (req.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
};

export const applyApiRateLimit = (
	req: NextApiRequest,
	res: NextApiResponse,
	scope: string,
	options: RateLimitOptions,
) => {
	const clientIp = getClientIp(req);
	const result = checkRateLimit(`${scope}:${clientIp}`, options);

	res.setHeader('X-RateLimit-Limit', String(result.limit ?? options.maxRequests));
	res.setHeader('X-RateLimit-Remaining', String(result.remaining));
	res.setHeader('X-RateLimit-Reset', String(result.resetAtUnixSec ?? 0));
	res.setHeader('Retry-After', String(result.retryAfterSec));

	return result;
};
