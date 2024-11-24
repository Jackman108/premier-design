import {NextApiRequest, NextApiResponse} from 'next';

import {FeedbackItem} from '../../interface/FeedbackModal.props';
import {fileService} from "./services/fileService";
import {emailService} from "./services/emailService";
import {telegramService} from "./services/telegramService";
import {envVar} from '../../validates/envVar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data: FeedbackItem = req.body;

            fileService.saveData(data);

            const emailConfig = {
                host: envVar('EMAIL_HOST'),
                port: parseInt(envVar('EMAIL_PORT')),
                user: envVar('EMAIL_USERNAME'),
                pass: envVar('EMAIL_PASSWORD'),
            };

            const telegramConfig = {
                token: envVar('TELEGRAM_BOT_TOKEN'),
                chatId: envVar('TELEGRAM_CHAT_ID'),
            };

            // Отправляем сообщение на почту
            await emailService.sendMail({
                ...emailConfig,
                from: data.name,
                to: 'jivatman108@gmail.com',
                subject: `New Feedback ${data.email}`,
                text: `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nMessage: ${data.message}`,
            });

            // Отправляем сообщение в Telegram
            const message = `
<b>Новое сообщение с формы:</b>
- <b>Имя:</b> ${data.name}
- <b>Телефон:</b> ${data.phone}
- <b>Email:</b> ${data.email || 'Не указан'}
- <b>Сообщение:</b> ${data.message}
`.trim();

            await telegramService.sendMessage(telegramConfig.token, telegramConfig.chatId, message);

            res.status(201).json({message: 'Feedback processed successfully.'});
        } catch (error) {
            console.error('Error handling feedback:', error);
            res.status(500).json({message: 'Failed to process the feedback.', error: (error as Error).message});
        }
    } else if (req.method === 'OPTIONS') {
        res.setHeader('Allow', ['POST', 'OPTIONS']);
        res.status(200).end();
    } else {
        res.status(405).json({message: 'Method not allowed.'});
    }
}
