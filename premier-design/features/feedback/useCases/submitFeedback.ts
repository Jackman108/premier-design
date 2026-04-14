import {emailService} from '../../../services/emailService';
import {envVar} from '../../../validates/envVar';
import {fileService} from '../../../services/fileService';
import {telegramService} from '../../../services/telegramService';
import {FeedbackInput} from '../schema';

export interface SubmitFeedbackResult {
    status: 'success' | 'error';
    message: string;
    error?: string;
}

export const submitFeedback = async (data: FeedbackInput): Promise<SubmitFeedbackResult> => {
    try {
        if (envVar('NODE_ENV') === 'development') {
            fileService.saveData(data);

            await emailService.sendMail({
                host: envVar('EMAIL_HOST'),
                port: parseInt(envVar('EMAIL_PORT'), 10),
                user: envVar('EMAIL_USERNAME'),
                pass: envVar('EMAIL_PASSWORD'),
                from: data.name,
                to: 'jivatman108@gmail.com',
                subject: `New Feedback ${data.email || ''}`.trim(),
                text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || 'Не указан'}\nMessage: ${data.message}`,
            });
        }

        const message = `
        <b>Новое сообщение с формы:</b>
        - <b>Имя:</b> ${data.name}
        - <b>Телефон:</b> ${data.phone}
        - <b>Email:</b> ${data.email || 'Не указан'}
        - <b>Сообщение:</b> ${data.message}
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
