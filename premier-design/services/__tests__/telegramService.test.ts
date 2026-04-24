import axios from 'axios';
import {telegramService} from '../telegramService';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
    },
}));

describe('telegramService', () => {
    const env = process.env as Record<string, string | undefined>;
    const prevTimeout = env.TELEGRAM_REQUEST_TIMEOUT_MS;

    afterEach(() => {
        if (prevTimeout === undefined) {
            delete env.TELEGRAM_REQUEST_TIMEOUT_MS;
        } else {
            env.TELEGRAM_REQUEST_TIMEOUT_MS = prevTimeout;
        }
    });

    it('posts message to telegram bot endpoint with default timeout', async () => {
        delete env.TELEGRAM_REQUEST_TIMEOUT_MS;
        const post = axios.post as jest.MockedFunction<typeof axios.post>;
        post.mockResolvedValue({} as never);

        await telegramService.sendMessage('token-123', 'chat-001', 'hello');

        expect(post).toHaveBeenCalledWith(
            'https://api.telegram.org/bottoken-123/sendMessage',
            {
                chat_id: 'chat-001',
                text: 'hello',
                parse_mode: 'HTML',
            },
            expect.objectContaining({timeout: 8_000}),
        );
    });

    it('uses TELEGRAM_REQUEST_TIMEOUT_MS when set', async () => {
        env.TELEGRAM_REQUEST_TIMEOUT_MS = '5000';
        const post = axios.post as jest.MockedFunction<typeof axios.post>;
        post.mockResolvedValue({} as never);

        await telegramService.sendMessage('t', 'c', 'm');

        expect(post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.objectContaining({timeout: 5_000}));
    });
});
