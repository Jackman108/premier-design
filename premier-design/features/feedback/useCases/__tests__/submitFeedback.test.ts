import {submitFeedback} from '../submitFeedback';
import {emailService} from '../../../../services/emailService';
import {fileService} from '../../../../services/fileService';
import {telegramService} from '../../../../services/telegramService';
import {
    getIntegrationCircuitStateForTest,
    resetIntegrationCircuitsForTests,
} from '../../../../shared/lib/integrationCircuit';

const TELEGRAM_CIRCUIT_NAME = 'feedback-telegram';

/** @types/node помечает `process.env.NODE_ENV` как read-only; для тестов пишем через `Record`. */
const assignTestEnv = (key: string, value: string | undefined): void => {
    const e = process.env as Record<string, string | undefined>;
    if (value === undefined) {
        delete e[key];
    } else {
        e[key] = value;
    }
};

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
        resetIntegrationCircuitsForTests();
        jest.clearAllMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        process.env = {
            ...process.env,
            NODE_ENV: 'development',
            EMAIL_HOST: 'smtp.example.com',
            EMAIL_PORT: '587',
            EMAIL_USERNAME: 'mailer@example.com',
            EMAIL_PASSWORD: 'secret',
            FEEDBACK_EMAIL_TO: 'inbox@example.com',
            FEEDBACK_EMAIL_FROM: 'noreply@example.com',
            TELEGRAM_BOT_TOKEN: 'bot-token',
            TELEGRAM_CHAT_ID: 'chat-id',
            FEEDBACK_CIRCUIT_FAILURE_THRESHOLD: '5',
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
        const mailOpts = mockedEmailService.sendMail.mock.calls[0][0];
        expect(mailOpts.from).toBe('noreply@example.com');
        expect(mailOpts.to).toBe('inbox@example.com');
        expect(mailOpts.replyTo).toContain('test@example.com');
        expect(mailOpts.text).toContain('&lt;b&gt;');
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
        expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(1);
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

    it('retries telegram send once on transient error and succeeds', async () => {
        mockedTelegramService.sendMessage
            .mockRejectedValueOnce(new Error('ETIMEDOUT'))
            .mockResolvedValueOnce(undefined);

        const result = await submitFeedback(payload);

        expect(result.status).toBe('success');
        expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(2);
    });

    it('opens circuit after repeated failures and returns 503 on subsequent attempts (RISK-10)', async () => {
        const envPrev = {
            nodeEnv: process.env.NODE_ENV,
            threshold: process.env.FEEDBACK_CIRCUIT_FAILURE_THRESHOLD,
            openMs: process.env.FEEDBACK_CIRCUIT_OPEN_MS,
        };
        // Не переприсваивать process.env целиком — в Node на это завязана семантика env-lookup.
        assignTestEnv('NODE_ENV', 'production');
        assignTestEnv('FEEDBACK_CIRCUIT_FAILURE_THRESHOLD', '2');
        assignTestEnv('FEEDBACK_CIRCUIT_OPEN_MS', '60000');
        try {
            expect(process.env.FEEDBACK_CIRCUIT_FAILURE_THRESHOLD).toBe('2');
            // Сообщение с транзиентным сигналом, чтобы `retryAsync` сделал maxAttempts вызовов.
            mockedTelegramService.sendMessage.mockRejectedValue(new Error('ETIMEDOUT: integration down'));

            const first = await submitFeedback(payload);
            expect(first.status).toBe('error');
            expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(2);
            expect(getIntegrationCircuitStateForTest(TELEGRAM_CIRCUIT_NAME)).toEqual({
                state: 'closed',
                consecutiveFailures: 1,
            });

            const second = await submitFeedback(payload);
            expect(second.status).toBe('error');
            expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(4);
            expect(getIntegrationCircuitStateForTest(TELEGRAM_CIRCUIT_NAME)?.state).toBe('open');

            const third = await submitFeedback(payload);
            expect(third.status).toBe('error');
            expect(third.code).toBe(503);
            expect(mockedTelegramService.sendMessage).toHaveBeenCalledTimes(4);
        } finally {
            assignTestEnv('NODE_ENV', envPrev.nodeEnv);
            assignTestEnv('FEEDBACK_CIRCUIT_FAILURE_THRESHOLD', envPrev.threshold);
            assignTestEnv('FEEDBACK_CIRCUIT_OPEN_MS', envPrev.openMs);
        }
    });
});
