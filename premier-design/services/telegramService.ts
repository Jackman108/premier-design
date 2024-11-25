import axios from 'axios';

export const telegramService = {
    async sendMessage(token: string, chatId: string, message: string): Promise<void> {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await axios.post(url, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
        });
    },
};