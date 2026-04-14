import {emailService} from '../../../services/emailService';
import {envVar} from '../../../services/envVar';
import {fileService} from '../../../services/fileService';
import {telegramService} from '../../../services/telegramService';
import {FeedbackInput} from '../schema';
import {escapeHtml} from '../../../shared/lib/sanitize';

export interface SubmitFeedbackResult {
    status: 'success' | 'error';
    message: string;
    error?: string;
}

export const submitFeedback = async (data: FeedbackInput): Promise<SubmitFeedbackResult> => {
    try {
        const safeName = escapeHtml(data.name);
        const safePhone = escapeHtml(data.phone);
        const safeEmail = escapeHtml(data.email || 'Не указан');
        const safeMessage = escapeHtml(data.message);

        if (envVar('NODE_ENV') === 'development') {
            fileService.saveData(data);

            await emailService.sendMail({
                host: envVar('EMAIL_HOST'),
                port: parseInt(envVar('EMAIL_PORT'), 10),
                user: envVar('EMAIL_USERNAME'),
                pass: envVar('EMAIL_PASSWORD'),
                from: safeName,
                to: 'jivatman108@gmail.com',
                subject: `New Feedback ${data.email || ''}`.trim(),
                text: `Name: ${safeName}\nPhone: ${safePhone}\nEmail: ${safeEmail}\nMessage: ${safeMessage}`,
            });
        }

        const message = `
        <b>Новое сообщение с формы:</b>
        - <b>Имя:</b> ${safeName}
        - <b>Телефон:</b> ${safePhone}
        - <b>Email:</b> ${safeEmail}
        - <b>Сообщение:</b> ${safeMessage}
        `.trim();

        await telegramService.sendMessage(
            envVar('TELEGRAM_BOT_TOKEN'),
            envVar('TELEGRAM_CHAT_ID'),
            message
        );

        return {status: 'success', message: 'Feedback processed successfully.'};
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error handling feedback:', error);
        return {status: 'error', message: 'Failed to process the feedback.', error: errorMessage};
    }
};
