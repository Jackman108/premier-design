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

        await emailService.sendMail({
            host: envVar('EMAIL_HOST'),
            port: parseInt(envVar('EMAIL_PORT'), 10),
            user: smtpUser,
            pass: emailPassword,
            from: payload.safeName,
            to: 'jivatman108@gmail.com',
            subject: `New Feedback ${payload.rawEmail || ''}`.trim(),
            text: `Name: ${payload.safeName}\nPhone: ${payload.safePhone}\nEmail: ${payload.safeEmail}\nMessage: ${payload.safeMessage}`,
        });
    },

    async sendTelegramMessage(message) {
        const telegramSecrets = taintSecretObject('TELEGRAM_SECRETS', {
            token: envVar('TELEGRAM_BOT_TOKEN'),
            chatId: envVar('TELEGRAM_CHAT_ID'),
        });

        await telegramService.sendMessage(telegramSecrets.token, telegramSecrets.chatId, message);
    },
};
