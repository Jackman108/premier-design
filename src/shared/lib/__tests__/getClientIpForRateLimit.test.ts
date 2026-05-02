import type { IncomingMessage } from 'http';
import type { Socket } from 'net';

import { getClientIpForRateLimit } from '../getClientIpForRateLimit';

const makeReq = (opts: { socketIp?: string; xForwardedFor?: string }): IncomingMessage => {
	const socket = { remoteAddress: opts.socketIp } as Socket;
	const headers: Record<string, string | undefined> = {};
	if (opts.xForwardedFor !== undefined) {
		headers['x-forwarded-for'] = opts.xForwardedFor;
	}
	return { socket, headers } as IncomingMessage;
};

describe('getClientIpForRateLimit', () => {
	const prev = process.env.RATE_LIMIT_TRUST_FORWARDED_FOR;

	afterEach(() => {
		process.env.RATE_LIMIT_TRUST_FORWARDED_FOR = prev;
	});

	it('ignores x-forwarded-for when proxy is not trusted', () => {
		delete process.env.RATE_LIMIT_TRUST_FORWARDED_FOR;
		const req = makeReq({ socketIp: '10.0.0.1', xForwardedFor: '6.6.6.6, 10.0.0.1' });
		expect(getClientIpForRateLimit(req)).toBe('10.0.0.1');
	});

	it('uses first x-forwarded-for hop when trust flag is set', () => {
		process.env.RATE_LIMIT_TRUST_FORWARDED_FOR = '1';
		const req = makeReq({ socketIp: '127.0.0.1', xForwardedFor: '203.0.113.7, 10.0.0.2' });
		expect(getClientIpForRateLimit(req)).toBe('203.0.113.7');
	});

	it('normalizes IPv4-mapped IPv6', () => {
		delete process.env.RATE_LIMIT_TRUST_FORWARDED_FOR;
		const req = makeReq({ socketIp: '::ffff:192.168.1.5' });
		expect(getClientIpForRateLimit(req)).toBe('192.168.1.5');
	});

	it('returns unknown when no address', () => {
		delete process.env.RATE_LIMIT_TRUST_FORWARDED_FOR;
		const req = makeReq({});
		expect(getClientIpForRateLimit(req)).toBe('unknown');
	});
});
