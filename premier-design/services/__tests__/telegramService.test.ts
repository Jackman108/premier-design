import axios from 'axios';
import {telegramService} from '../telegramService';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        post: jest.fn(),
    },
}));

describe('telegramService', () => {
    it('posts message to telegram bot endpoint', async () => {
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
            expect.objectContaining({timeout: 10_000}),
        );
    });
});
