import { NextResponse } from 'next/server';

import { applyApiRateLimitWeb } from '@shared/lib/applyApiRateLimit.web';
import { webVitalsIngestBodySchema } from '@shared/lib/web-vitals-ingest';

const MAX_BODY_BYTES = 2048;

export async function OPTIONS(): Promise<NextResponse> {
	const res = NextResponse.json({}, { status: 200 });
	res.headers.set('Allow', ['POST', 'OPTIONS'].join(', '));
	return res;
}

export async function GET(): Promise<NextResponse> {
	return NextResponse.json(
		{ error: 'Method not allowed. Use POST.' },
		{ status: 405, headers: { Allow: ['POST', 'OPTIONS'].join(', ') } },
	);
}

export async function POST(request: Request): Promise<NextResponse> {
	const contentType = request.headers.get('content-type') || '';
	if (!contentType.includes('application/json')) {
		return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
	}

	const rate = applyApiRateLimitWeb(request, 'vitals', { windowMs: 60_000, maxRequests: 120 });
	if (!rate.allowed) {
		return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: rate.limitHeaders });
	}

	const rawText = await request.text();
	if (rawText.length > MAX_BODY_BYTES) {
		return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(rawText) as unknown;
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const body = webVitalsIngestBodySchema.safeParse(parsed);
	if (!body.success) {
		const msg = body.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
		return NextResponse.json({ error: msg }, { status: 400 });
	}

	if (process.env.WEB_VITALS_LOG === '1') {
		// Структурная строка для log-агрегаторов (без PII); opt-in через WEB_VITALS_LOG.
		console.info('[web-vitals]', JSON.stringify(body.data));
	}

	return new NextResponse(null, { status: 204 });
}
