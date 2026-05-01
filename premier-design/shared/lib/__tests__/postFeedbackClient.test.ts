/** @jest-environment node */
import { PostFeedbackError, postFeedbackToApi } from '../postFeedbackClient';

const payload = {
	name: 'Test',
	phone: '+000',
	email: '',
	message: 'Hi',
	consent: true,
};

const mockResponse = (init: { ok: boolean; status: number; body: string; correlationHeader?: string }): Response =>
	({
		ok: init.ok,
		status: init.status,
		statusText: 'test',
		headers: { get: (k: string) => (k === 'X-Correlation-Id' ? (init.correlationHeader ?? null) : null) },
		text: () => Promise.resolve(init.body),
	}) as unknown as Response;

describe('postFeedbackToApi', () => {
	beforeEach(() => {
		(global as unknown as { fetch: typeof fetch }).fetch = jest.fn() as unknown as typeof fetch;
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('resolves on 200', async () => {
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse({ ok: true, status: 200, body: '{}' }));
		await expect(postFeedbackToApi(payload)).resolves.toBeUndefined();
	});

	it('throws PostFeedbackError with error and correlationId from JSON', async () => {
		const body = JSON.stringify({
			success: false,
			errorCode: 'VALIDATION_FAILED',
			error: 'Validation failed.',
			correlationId: 'abc-123',
		});
		(global.fetch as jest.Mock).mockResolvedValue(mockResponse({ ok: false, status: 400, body }));
		try {
			await postFeedbackToApi(payload);
		} catch (e) {
			expect(e).toBeInstanceOf(PostFeedbackError);
			const err = e as PostFeedbackError;
			expect(err.statusCode).toBe(400);
			expect(err.message).toBe('Validation failed.');
			expect(err.correlationId).toBe('abc-123');
		}
	});

	it('falls back to legacy message field when error is absent', async () => {
		(global.fetch as jest.Mock).mockResolvedValue(
			mockResponse({
				ok: false,
				status: 429,
				body: JSON.stringify({ success: false, errorCode: 'RATE_LIMITED', message: 'Too many requests.' }),
				correlationHeader: 'from-header',
			}),
		);
		try {
			await postFeedbackToApi(payload);
		} catch (e) {
			const err = e as PostFeedbackError;
			expect(err.message).toBe('Too many requests.');
			expect(err.correlationId).toBe('from-header');
		}
	});
});
