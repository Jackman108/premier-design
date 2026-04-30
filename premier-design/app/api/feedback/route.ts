import { NextResponse } from 'next/server';
import { z } from 'zod';

import { submitFeedbackAction } from '@features/feedback/useCases/submitFeedbackAction';
import { feedbackSchema } from '@features/feedback/schema';
import { applyApiRateLimitWeb } from '@shared/lib/applyApiRateLimit.web';
import { createCorrelationId } from '@shared/lib/correlationId';
import { createApiErrorPayload, withTimeout } from '@shared/lib/api/apiRequestRuntime';
import { getFeedbackApiTimeoutMs, recordFeedbackSloSample } from '@shared/lib/feedbackSlo';

const resolveCorrelationId = (request: Request): string => {
	const raw = request.headers.get('x-correlation-id');
	if (typeof raw === 'string' && raw.trim().length > 0) {
		return raw.trim();
	}
	return createCorrelationId('cid');
};

export async function OPTIONS() {
	const res = NextResponse.json({}, { status: 200 });
	res.headers.set('Allow', ['POST', 'OPTIONS'].join(', '));
	return res;
}

export async function GET() {
	const correlationId = createCorrelationId('cid');
	return NextResponse.json(createApiErrorPayload(correlationId, 'Method not allowed. Use POST.'), {
		status: 405,
		headers: {
			Allow: ['POST', 'OPTIONS'].join(', '),
			'X-Correlation-Id': correlationId,
		},
	});
}

export async function POST(request: Request) {
	const correlationId = resolveCorrelationId(request);
	const startedAt = Date.now();

	const finish = (statusCode: number, options: { status?: 'success' | 'error'; timedOut?: boolean } = {}) => {
		const durationMs = Date.now() - startedAt;
		recordFeedbackSloSample({ statusCode, timedOut: options.timedOut ?? false, durationMs });
	};

	const jsonHeaders = (extra: Record<string, string> = {}) => ({
		'Content-Type': 'application/json',
		'X-Correlation-Id': correlationId,
		...extra,
	});

	const contentType = request.headers.get('content-type') || '';
	if (!contentType.includes('application/json')) {
		finish(415, { status: 'error' });
		return NextResponse.json(
			createApiErrorPayload(correlationId, 'Unsupported content type. Use application/json.'),
			{ status: 415, headers: jsonHeaders() },
		);
	}

	const rate = applyApiRateLimitWeb(request, 'feedback', { windowMs: 60_000, maxRequests: 5 });
	if (!rate.allowed) {
		finish(429, { status: 'error' });
		return NextResponse.json(createApiErrorPayload(correlationId, 'Too many requests. Try again later.'), {
			status: 429,
			headers: jsonHeaders(rate.limitHeaders),
		});
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		finish(400, { status: 'error' });
		return NextResponse.json(createApiErrorPayload(correlationId, 'Invalid JSON body.'), {
			status: 400,
			headers: jsonHeaders(rate.limitHeaders),
		});
	}

	const parsed = feedbackSchema.safeParse(body);
	if (!parsed.success) {
		finish(400, { status: 'error' });
		return NextResponse.json(
			{
				...createApiErrorPayload(correlationId, 'Validation failed.'),
				errors: z.treeifyError(parsed.error),
			},
			{ status: 400, headers: jsonHeaders(rate.limitHeaders) },
		);
	}

	const timedCall = await withTimeout(submitFeedbackAction(parsed.data), getFeedbackApiTimeoutMs());
	if (timedCall.error) {
		const statusCode = 500;
		finish(statusCode, { status: 'error' });
		return NextResponse.json(
			createApiErrorPayload(correlationId, 'Failed to process feedback.', { code: statusCode }),
			{
				status: statusCode,
				headers: jsonHeaders(rate.limitHeaders),
			},
		);
	}

	if (timedCall.timedOut || !timedCall.value) {
		const statusCode = 504;
		finish(statusCode, { status: 'error', timedOut: true });
		return NextResponse.json(
			createApiErrorPayload(correlationId, 'Feedback processing timed out.', { code: statusCode }),
			{
				status: statusCode,
				headers: jsonHeaders(rate.limitHeaders),
			},
		);
	}

	const response = timedCall.value;

	switch (response.status) {
		case 'error': {
			const statusCode = response.code ?? 500;
			finish(statusCode, { status: 'error' });
			return NextResponse.json(
				{ ...response, correlationId },
				{ status: statusCode, headers: jsonHeaders(rate.limitHeaders) },
			);
		}
		case 'success': {
			finish(200);
			return NextResponse.json(
				{ ...response, correlationId },
				{ status: 200, headers: jsonHeaders(rate.limitHeaders) },
			);
		}
		default: {
			const statusCode = 500;
			finish(statusCode, { status: 'error' });
			return NextResponse.json(
				createApiErrorPayload(correlationId, 'Unexpected feedback response status.', { code: statusCode }),
				{ status: statusCode, headers: jsonHeaders(rate.limitHeaders) },
			);
		}
	}
}
