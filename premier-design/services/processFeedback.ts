import {FeedbackItem} from "../interface/FeedbackModal.props";
import {fileService} from "./fileService";
import {emailService} from "./emailService";
import {envVar} from "../validates/envVar";
import {telegramService} from "./telegramService";

export const processFeedback = async (data: FeedbackItem) => {
    try {
        if (envVar('NODE_ENV') === 'development') {
            fileService.saveData(data);

            const emailConfig = {
                host: envVar('EMAIL_HOST'),
                port: parseInt(envVar('EMAIL_PORT')),
                user: envVar('EMAIL_USERNAME'),
                pass: envVar('EMAIL_PASSWORD'),
            };
            await emailService.sendMail({
                ...emailConfig,
                from: data.name,
                to: 'jivatman108@gmail.com',
                subject: `New Feedback ${data.email}`,
                text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nMessage: ${data.message}`,
            });
        }

        const telegramConfig = {
            token: envVar('TELEGRAM_BOT_TOKEN'),
            chatId: envVar('TELEGRAM_CHAT_ID'),
        };

        const message = `
        <b>Новое сообщение с формы:</b>
        - <b>Имя:</b> ${data.name}
        - <b>Телефон:</b> ${data.phone}
        - <b>Email:</b> ${data.email || 'Не указан'}
        - <b>Сообщение:</b> ${data.message}
        `.trim();

        await telegramService.sendMessage(telegramConfig.token, telegramConfig.chatId, message);

        return {status: 'success', message: 'Feedback processed successfully.'};
    } catch (error) {
        console.error('Error handling feedback:', error);
        return {status: 'error', message: 'Failed to process the feedback.', error: (error as Error).message};
    }
};
