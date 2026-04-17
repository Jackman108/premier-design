import type {NextApiRequest, NextApiResponse} from 'next';
import {getClientIpForRateLimit} from '@shared/lib/getClientIpForRateLimit';
import {checkRateLimit, RateLimitOptions} from '@shared/lib/rateLimit';

export const applyApiRateLimit = (
	req: NextApiRequest,
	res: NextApiResponse,
	scope: string,
	options: RateLimitOptions,
) => {
	const clientIp = getClientIpForRateLimit(req);
	const result = checkRateLimit(`${scope}:${clientIp}`, options);

	res.setHeader('X-RateLimit-Limit', String(result.limit ?? options.maxRequests));
	res.setHeader('X-RateLimit-Remaining', String(result.remaining));
	res.setHeader('X-RateLimit-Reset', String(result.resetAtUnixSec ?? 0));
	res.setHeader('Retry-After', String(result.retryAfterSec));

	return result;
};
