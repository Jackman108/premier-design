import type {NextApiRequest, NextApiResponse} from 'next';
import handler from '../../pages/api/feedback';
import {submitFeedback} from '../../features/feedback/useCases/submitFeedback';
import {checkRateLimit} from '../../shared/lib/rateLimit';

jest.mock('../../features/feedback/useCases/submitFeedback', () => ({
    submitFeedback: jest.fn(),
}));

jest.mock('../../shared/lib/rateLimit', () => ({
    checkRateLimit: jest.fn(),
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
    const mockedSubmitFeedback = submitFeedback as jest.MockedFunction<typeof submitFeedback>;
    const mockedRateLimit = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockedRateLimit.mockReturnValue({allowed: true, remaining: 4, retryAfterSec: 60});
    });

    it('handles OPTIONS request', async () => {
        const req = createRequest({method: 'OPTIONS'});
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.headers.allow).toEqual(['POST', 'OPTIONS']);
        expect(res.ended).toBe(true);
    });

    it('returns 405 for unsupported method', async () => {
        const req = createRequest({method: 'GET'});
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(405);
    });

    it('returns 415 for unsupported content type', async () => {
        const req = createRequest({
            method: 'POST',
            headers: {'content-type': 'text/plain'},
        });
        const res = createMockResponse();

        await handler(req, res);

        expect(res.statusCode).toBe(415);
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
    });

    it('returns 500 when submitFeedback fails', async () => {
        mockedSubmitFeedback.mockResolvedValueOnce({
            status: 'error',
            message: 'Failed to process the feedback.',
            error: 'boom',
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
    });

    it('returns 200 for valid payload and success result', async () => {
        mockedSubmitFeedback.mockResolvedValueOnce({
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
        expect(mockedSubmitFeedback).toHaveBeenCalledTimes(1);
        expect(res.headers['x-ratelimit-remaining']).toBe('4');
        expect(res.headers['retry-after']).toBe('60');
    });
});
