import {emailService} from '../emailService';
import {envVar} from '../envVar';
import {fileService} from '../fileService';
import {telegramService} from '../telegramService';
import {FeedbackInput} from '../../features/feedback/schema';
import {taintSecretObject, taintSecretValue} from '../../shared/lib/taintSecrets';

export interface FeedbackDal {
    isDevelopment(): boolean;
    saveDebugPayload(payload: FeedbackInput): void;
    sendFeedbackEmail(payload: {safeName: string; safePhone: string; safeEmail: string; safeMessage: string; rawEmail: string}): Promise<void>;
    sendTelegramMessage(message: string): Promise<void>;
}

export const feedbackDal: FeedbackDal = {
    isDevelopment() {
        return envVar('NODE_ENV') === 'development';
    },

    saveDebugPayload(payload) {
        fileService.saveData(payload);
    },

    async sendFeedbackEmail(payload) {
        const emailPassword = taintSecretValue('EMAIL_PASSWORD', envVar('EMAIL_PASSWORD'));
        const smtpUser = taintSecretValue('EMAIL_USERNAME', envVar('EMAIL_USERNAME'));
        const fromAddress = (process.env.FEEDBACK_EMAIL_FROM ?? '').trim() || envVar('EMAIL_USERNAME');
        const toAddress = envVar('FEEDBACK_EMAIL_TO');
        const replyTo =
            payload.rawEmail.trim().length > 0
                ? `${payload.safeName.replace(/"/g, "'")} <${payload.rawEmail.trim()}>`
                : undefined;

        /** Короче, чем default emailService, чтобы `retry`×2 + Telegram не съедали весь SLO `FEEDBACK_API_TIMEOUT_MS`. */
        await emailService.sendMail(
            {
                host: envVar('EMAIL_HOST'),
                port: parseInt(envVar('EMAIL_PORT'), 10),
                user: smtpUser,
                pass: emailPassword,
                from: fromAddress,
                ...(replyTo ? {replyTo} : {}),
                to: toAddress,
                subject: `New Feedback ${payload.rawEmail || ''}`.trim(),
                text: `Name: ${payload.safeName}\nPhone: ${payload.safePhone}\nEmail: ${payload.safeEmail}\nMessage: ${payload.safeMessage}`,
            },
            {
                connectionTimeout: 5_000,
                greetingTimeout: 5_000,
                socketTimeout: 6_000,
            },
        );
    },

    async sendTelegramMessage(message) {
        const telegramSecrets = taintSecretObject('TELEGRAM_SECRETS', {
            token: envVar('TELEGRAM_BOT_TOKEN'),
            chatId: envVar('TELEGRAM_CHAT_ID'),
        });

        await telegramService.sendMessage(telegramSecrets.token, telegramSecrets.chatId, message);
    },
};
