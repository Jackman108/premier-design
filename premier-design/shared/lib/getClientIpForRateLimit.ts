import type { IncomingMessage } from 'http';

/**
 * IP для rate limit: без доверенного прокси заголовок `x-forwarded-for` нельзя
 * брать первым хопом — клиент может подставить произвольное значение.
 * На Vercel / за nginx с `real_ip` включите `RATE_LIMIT_TRUST_FORWARDED_FOR=1`.
 */
const normalizeIp = (ip: string | undefined): string => {
	if (!ip) {
		return '';
	}
	return ip.replace(/^::ffff:/u, '').trim();
};

export const getClientIpForRateLimit = (req: IncomingMessage): string => {
	const socketIp = normalizeIp(req.socket?.remoteAddress);
	const trustForwarded = process.env.RATE_LIMIT_TRUST_FORWARDED_FOR === '1';

	if (!trustForwarded) {
		return socketIp || 'unknown';
	}

	const raw = req.headers['x-forwarded-for'];
	const xff = Array.isArray(raw) ? raw.join(',') : raw;
	if (typeof xff === 'string' && xff.trim()) {
		const first = xff.split(',')[0]?.trim();
		if (first) {
			return first;
		}
	}

	return socketIp || 'unknown';
};
