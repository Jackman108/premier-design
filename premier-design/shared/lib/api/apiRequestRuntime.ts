import type { IncomingHttpHeaders } from 'node:http';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createCorrelationId } from '@shared/lib/correlationId';

type ApiStatus = 'success' | 'error';

type TimeoutResult<T> = {
	timedOut: boolean;
	value?: T;
	error?: unknown;
};

type FinishOptions = {
	status?: ApiStatus;
	timedOut?: boolean;
	extra?: Record<string, unknown>;
};

const resolveCorrelationId = (headers: IncomingHttpHeaders | undefined): string => {
	const rawValue = headers?.['x-correlation-id'];
	if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
		return rawValue;
	}
	if (Array.isArray(rawValue) && typeof rawValue[0] === 'string' && rawValue[0].trim().length > 0) {
		return rawValue[0];
	}
	return createCorrelationId('cid');
};

export const withTimeout = async <T>(task: Promise<T>, timeoutMs: number): Promise<TimeoutResult<T>> => {
	return new Promise((resolve) => {
		// Защита от зависания внешних вызовов: timeout обеспечивает предсказуемый SLA ответа API.
		const timer = setTimeout(() => {
			resolve({ timedOut: true });
		}, timeoutMs);

		void task
			.then((value) => {
				clearTimeout(timer);
				resolve({ timedOut: false, value });
			})
			.catch((error) => {
				clearTimeout(timer);
				resolve({ timedOut: false, error });
			});
	});
};

export const createApiRequestObserver = (
	req: NextApiRequest,
	res: NextApiResponse,
	route: string,
	onFinish?: (payload: { statusCode: number; timedOut: boolean; durationMs: number }) => void,
) => {
	const correlationId = resolveCorrelationId(req.headers);
	const startedAt = Date.now();
	res.setHeader('X-Correlation-Id', correlationId);

	const finish = (statusCode: number, options: FinishOptions = {}) => {
		const durationMs = Date.now() - startedAt;
		const status = options.status ?? 'success';
		const timedOut = options.timedOut ?? false;

		onFinish?.({ statusCode, timedOut, durationMs });

		const eventPayload = {
			route,
			method: req.method ?? 'UNKNOWN',
			correlationId,
			statusCode,
			status,
			timedOut,
			durationMs,
			at: new Date().toISOString(),
			...options.extra,
		};

		// Унифицированный envelope логов для агрегатора (по correlationId и route).
		if (statusCode >= 500) {
			console.error(`[api] ${JSON.stringify(eventPayload)}`);
			return;
		}
		console.info(`[api] ${JSON.stringify(eventPayload)}`);
	};

	return { correlationId, finish };
};

export const createApiErrorPayload = (correlationId: string, message: string, extra: Record<string, unknown> = {}) => {
	return {
		status: 'error' as const,
		message,
		correlationId,
		...extra,
	};
};
