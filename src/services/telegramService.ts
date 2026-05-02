import axios from 'axios';

const toTimeoutMs = (): number => {
	const raw = process.env.TELEGRAM_REQUEST_TIMEOUT_MS;
	if (raw === undefined || !raw.trim()) {
		return 8_000;
	}
	const n = Number.parseInt(raw, 10);
	return Number.isFinite(n) && n > 0 ? n : 8_000;
};

export const telegramService = {
	async sendMessage(token: string, chatId: string, message: string): Promise<void> {
		const url = `https://api.telegram.org/bot${token}/sendMessage`;
		await axios.post(
			url,
			{
				chat_id: chatId,
				text: message,
				parse_mode: 'HTML',
			},
			{ timeout: toTimeoutMs() },
		);
	},
};
