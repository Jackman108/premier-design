import { POST, OPTIONS } from '../../app/api/feedback/route';
import { submitFeedbackAction } from '../../features/feedback/useCases/submitFeedbackAction';
import { checkRateLimit } from '../../shared/lib/rateLimit';
import { getFeedbackApiTimeoutMs } from '../../shared/lib/feedbackSlo';

jest.mock('../../features/feedback/useCases/submitFeedbackAction', () => ({
	submitFeedbackAction: jest.fn(),
}));

jest.mock('../../shared/lib/rateLimit', () => ({
	checkRateLimit: jest.fn(),
}));

jest.mock('../../shared/lib/feedbackSlo', () => ({
	getFeedbackApiTimeoutMs: jest.fn(() => 20_000),
	recordFeedbackSloSample: jest.fn(),
}));

describe('/api/feedback Route Handler', () => {
	const mockedSubmitFeedbackAction = submitFeedbackAction as jest.MockedFunction<typeof submitFeedbackAction>;
	const mockedRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;
	const mockedGetFeedbackApiTimeoutMs = getFeedbackApiTimeoutMs as jest.MockedFunction<
		typeof getFeedbackApiTimeoutMs
	>;

	beforeEach(() => {
		jest.clearAllMocks();
		mockedRateLimit.mockReturnValue({ allowed: true, remaining: 4, retryAfterSec: 60, limit: 5 });
		mockedGetFeedbackApiTimeoutMs.mockReturnValue(20_000);
	});

	it('handles OPTIONS request', async () => {
		const res = await OPTIONS();
		expect(res.status).toBe(200);
		expect(res.headers.get('Allow')).toContain('POST');
	});

	it('reuses incoming x-correlation-id header', async () => {
		mockedSubmitFeedbackAction.mockResolvedValueOnce({
			status: 'success',
			message: 'Feedback processed successfully.',
		});
		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-correlation-id': 'external-cid-123',
			},
			body: JSON.stringify({
				name: 'Иван Иванов',
				phone: '+375291234567',
				email: 'ivan@test.by',
				message: 'Нужен расчет',
				consent: true,
			}),
		});
		const res = await POST(req);
		expect(res.status).toBe(200);
		expect(res.headers.get('x-correlation-id')).toBe('external-cid-123');
		const json = (await res.json()) as { success: boolean; correlationId: string; message?: string };
		expect(json.success).toBe(true);
		expect(json.correlationId).toBe('external-cid-123');
	});

	it('returns 415 for unsupported content type', async () => {
		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: { 'content-type': 'text/plain' },
			body: 'x',
		});
		const res = await POST(req);
		expect(res.status).toBe(415);
	});

	it('returns 429 when rate limit exceeded', async () => {
		mockedRateLimit.mockReturnValueOnce({
			allowed: false,
			remaining: 0,
			retryAfterSec: 10,
			limit: 5,
		});
		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({}),
		});
		const res = await POST(req);
		expect(res.status).toBe(429);
	});

	it('returns 400 for invalid payload', async () => {
		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ name: '', phone: '', message: '', consent: false }),
		});
		const res = await POST(req);
		expect(res.status).toBe(400);
	});

	it('returns 500 when submitFeedback fails', async () => {
		mockedSubmitFeedbackAction.mockResolvedValueOnce({
			status: 'error',
			message: 'Failed to process the feedback.',
			code: 500,
		});
		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				name: 'Иван Иванов',
				phone: '+375291234567',
				email: 'ivan@test.by',
				message: 'Нужен расчет',
				consent: true,
			}),
		});
		const res = await POST(req);
		expect(res.status).toBe(500);
	});

	it('returns 200 for valid payload and success result', async () => {
		mockedSubmitFeedbackAction.mockResolvedValueOnce({
			status: 'success',
			message: 'Feedback processed successfully.',
		});
		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				name: 'Иван Иванов',
				phone: '+375291234567',
				email: 'ivan@test.by',
				message: 'Нужен расчет',
				consent: true,
			}),
		});
		const res = await POST(req);
		expect(res.status).toBe(200);
		expect(mockedSubmitFeedbackAction).toHaveBeenCalledTimes(1);
		expect(res.headers.get('x-ratelimit-remaining')).toBe('4');
		expect(res.headers.get('retry-after')).toBe('60');
	});

	it('returns 504 when submitFeedbackAction exceeds timeout budget', async () => {
		mockedGetFeedbackApiTimeoutMs.mockReturnValueOnce(1);
		mockedSubmitFeedbackAction.mockImplementationOnce(async () => {
			await new Promise((resolve) => {
				setTimeout(resolve, 30);
			});
			return { status: 'success', message: 'ok' };
		});

		const req = new Request('http://localhost/api/feedback', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				name: 'Иван Иванов',
				phone: '+375291234567',
				email: 'ivan@test.by',
				message: 'Нужен расчет',
				consent: true,
			}),
		});
		const res = await POST(req);
		expect(res.status).toBe(504);
	});
});
