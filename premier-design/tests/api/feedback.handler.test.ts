import type {NextApiRequest, NextApiResponse} from 'next';
import handler from '../../pages/api/feedback';
import {submitFeedbackAction} from '../../features/feedback/useCases/submitFeedbackAction';
import {checkRateLimit} from '../../shared/lib/rateLimit';
import {getFeedbackApiTimeoutMs} from '../../shared/lib/feedbackSlo';

jest.mock('../../features/feedback/useCases/submitFeedbackAction', () => ({
    submitFeedbackAction: jest.fn(),
}));

jest.mock('../../shared/lib/rateLimit', () => ({
    checkRateLimit: jest.fn(),
}));

jest.mock('../../shared/lib/feedbackSlo', () => ({
    getFeedbackApiTimeoutMs: jest.fn(() => 8_000),
    recordFeedbackSloSample: jest.fn(),
}));

type MockResponse = {
    statusCode: number;
    body: unknown;
    headers: Record<string, string | string[]>;
    ended: boolean;
    setHeader: (key: string, value: string | string[]) => MockResponse;
    status: (code: number) => MockResponse;
    json: (payload: unknown) => MockResponse;
    end: () => MockResponse;
};

const createMockResponse = (): NextApiResponse & MockResponse => {
    const res: MockResponse = {
        statusCode: 200,
        body: null as unknown,
        headers: {},
        ended: false,
        setHeader(key: string, value: string | string[]) {
            this.headers[key.toLowerCase()] = value;
            return this;
        },
        status(code: number) {
            this.statusCode = code;
            return this;
        },
        json(payload: unknown) {
            this.body = payload;
            return this;
        },
        end() {
            this.ended = true;
            return this;
        },
    };

    return res as unknown as NextApiResponse & MockResponse;
};

const createRequest = (overrides: Partial<NextApiRequest>): NextApiRequest => {
    return {
        method: 'GET',
        headers: {},
        body: {},
        socket: {remoteAddress: '127.0.0.1'},
        ...overrides,
    } as unknown as NextApiRequest;
};

describe('/api/feedback handler', () => {
    const mockedSubmitFeedbackAction = submitFeedbackAction as jest.MockedFunction<typeof submitFeedbackAction>;
    const mockedRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;
    const mockedGetFeedbackApiTimeoutMs = getFeedbackApiTimeoutMs as jest.MockedFunction<typeof getFeedbackApiTimeoutMs>;
    let consoleInfoSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => undefined);
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        mockedRateLimit.mockReturnValue({allowed: true, remaining: 4, retryAfterSec: 60});
        mockedGetFeedbackApiTimeoutMs.mockReturnValue(8_000);
    });

    afterEach(() => {
        consoleInfoSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('handles OPTIONS request', async () => {
        const req = createRequest({method: 'OPTIONS'});
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.headers.allow).toEqual(['POST', 'OPTIONS']);
        expect(res.headers['x-correlation-id']).toBeDefined();
        expect(res.ended).toBe(true);
    });

    it('returns 405 for unsupported method', async () => {
        const req = createRequest({method: 'GET'});
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(405);
        expect(res.headers['x-correlation-id']).toBeDefined();
        const body = res.body as {message?: string; correlationId?: string; status?: string};
        expect(body?.correlationId).toBeTruthy();
        expect(body?.message).toBe('Method not allowed.');
    });

    it('reuses incoming x-correlation-id header', async () => {
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'application/json', 'x-correlation-id': 'external-cid-123'},
            body: {
                name: 'Иван Иванов',
                phone: '+375291234567',
                email: 'ivan@test.by',
                message: 'Нужен расчет',
                consent: true,
            },
        });
        mockedSubmitFeedbackAction.mockResolvedValueOnce({
            status: 'success',
            message: 'Feedback processed successfully.',
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.headers['x-correlation-id']).toBe('external-cid-123');
        expect((res.body as {correlationId: string}).correlationId).toBe('external-cid-123');
    });

    it('returns 415 for unsupported content type', async () => {
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'text/plain'},
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(415);
        expect((res.body as {correlationId: string}).correlationId).toBeTruthy();
    });

    it('returns 429 when rate limit exceeded', async () => {
        mockedRateLimit.mockReturnValueOnce({allowed: false, remaining: 0, retryAfterSec: 10});
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'application/json'},
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(429);
        expect((res.body as {correlationId: string}).correlationId).toBeTruthy();
    });

    it('returns 400 for invalid payload', async () => {
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: {name: '', phone: '', message: '', consent: false},
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect((res.body as {correlationId: string}).correlationId).toBeTruthy();
    });

    it('returns 500 when submitFeedback fails', async () => {
        mockedSubmitFeedbackAction.mockResolvedValueOnce({
            status: 'error',
            message: 'Failed to process the feedback.',
            code: 500,
        });
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: {
                name: 'Иван Иванов',
                phone: '+375291234567',
                email: 'ivan@test.by',
                message: 'Нужен расчет',
                consent: true,
            },
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(500);
        expect((res.body as {correlationId: string}).correlationId).toBeTruthy();
    });

    it('returns 200 for valid payload and success result', async () => {
        mockedSubmitFeedbackAction.mockResolvedValueOnce({
            status: 'success',
            message: 'Feedback processed successfully.',
        });
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: {
                name: 'Иван Иванов',
                phone: '+375291234567',
                email: 'ivan@test.by',
                message: 'Нужен расчет',
                consent: true,
            },
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(mockedSubmitFeedbackAction).toHaveBeenCalledTimes(1);
        expect(res.headers['x-ratelimit-remaining']).toBe('4');
        expect(res.headers['retry-after']).toBe('60');
        expect((res.body as {correlationId: string}).correlationId).toBeTruthy();
    });

    it('returns 504 when submitFeedbackAction exceeds timeout budget', async () => {
        mockedGetFeedbackApiTimeoutMs.mockReturnValueOnce(1);
        mockedSubmitFeedbackAction.mockImplementationOnce(async () => {
            await new Promise((resolve) => {
                setTimeout(resolve, 30);
            });
            return {status: 'success', message: 'ok'};
        });

        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: {
                name: 'Иван Иванов',
                phone: '+375291234567',
                email: 'ivan@test.by',
                message: 'Нужен расчет',
                consent: true,
            },
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(504);
        expect((res.body as {correlationId: string}).correlationId).toBeTruthy();
    });
});
