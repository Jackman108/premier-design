import {submitFeedback} from '../submitFeedback';
import {emailService} from '../../../../services/emailService';
import {fileService} from '../../../../services/fileService';
import {telegramService} from '../../../../services/telegramService';

jest.mock('../../../../services/emailService', () => ({
    emailService: {
        sendMail: jest.fn(),
    },
}));

jest.mock('../../../../services/fileService', () => ({
    fileService: {
        saveData: jest.fn(),
    },
}));

jest.mock('../../../../services/telegramService', () => ({
    telegramService: {
        sendMessage: jest.fn(),
    },
}));

describe('submitFeedback', () => {
    const payload = {
        name: 'Иван <b>Иванов</b>',
        phone: '+375291234567',
        email: 'test@example.com',
        message: 'Нужна консультация <script>alert(1)</script>.',
        consent: true,
    };

    const mockedEmailService = emailService as jest.Mocked<typeof emailService>;
    const mockedFileService = fileService as jest.Mocked<typeof fileService>;
    const mockedTelegramService = telegramService as jest.Mocked<typeof telegramService>;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        process.env = {
            ...process.env,
            NODE_ENV: 'development',
            EMAIL_HOST: 'smtp.example.com',
            EMAIL_PORT: '587',
            EMAIL_USERNAME: 'mailer@example.com',
            EMAIL_PASSWORD: 'secret',
            TELEGRAM_BOT_TOKEN: 'bot-token',
            TELEGRAM_CHAT_ID: 'chat-id',
        };
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    it('saves to file, sends email and telegram in development mode', async () => {
        const result = await submitFeedback(payload);

        expect(result.status).toBe('success');
        expect(mockedFileService.saveData).toHaveBeenCalledWith(payload);
        expect(mockedEmailService.sendMail).toHaveBeenCalledTimes(1);
        expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(1);
        expect(mockedEmailService.sendMail.mock.calls[0][0].from).toContain('&lt;b&gt;');
    });

    it('skips email and file persistence in production mode', async () => {
        process.env = {...process.env, NODE_ENV: 'production'};

        const result = await submitFeedback(payload);

        expect(result.status).toBe('success');
        expect(mockedFileService.saveData).not.toHaveBeenCalled();
        expect(mockedEmailService.sendMail).not.toHaveBeenCalled();
        expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(1);
    });

    it('returns error result when telegram send fails', async () => {
        mockedTelegramService.sendMessage.mockRejectedValueOnce(new Error('Telegram outage'));

        const result = await submitFeedback(payload);

        expect(result.status).toBe('error');
        expect(result.error).toBe('Telegram outage');
        expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('returns fallback unknown error message for non-Error throw', async () => {
        mockedTelegramService.sendMessage.mockRejectedValueOnce('string-failure');

        const result = await submitFeedback(payload);

        expect(result.status).toBe('error');
        expect(result.error).toBe('Unknown error');
    });

    it('sends "Не указан" when email is missing', async () => {
        const noEmailPayload = {...payload, email: ''};

        const result = await submitFeedback(noEmailPayload);

        expect(result.status).toBe('success');
        const messageArg = mockedTelegramService.sendMessage.mock.calls[0][2];
        expect(messageArg).toContain('Не указан');
    });
});
