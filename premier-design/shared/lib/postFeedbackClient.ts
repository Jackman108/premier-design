import type { FeedbackInput } from '@shared/validates/feedbackSchema';

const readCorrelation = (h: string | null): string | undefined => {
	const t = h?.trim();
	return t && t.length > 0 ? t : undefined;
};

const parseErrorBody = (text: string): { message?: string; correlationId?: string } => {
	if (!text) {
		return {};
	}
	try {
		return JSON.parse(text) as { message?: string; correlationId?: string; status?: string };
	} catch {
		return {};
	}
};

/** Сопоставимо с `createApiErrorPayload` и успешным телом `submitFeedbackAction`. */
export class PostFeedbackError extends Error {
	readonly name = 'PostFeedbackError';

	constructor(
		public readonly statusCode: number,
		displayMessage: string,
		public readonly correlationId?: string,
	) {
		super(displayMessage);
	}
}

/** Клиентский адаптер к `POST /api/feedback` (вне UI-слоя). Пробрасывает `correlationId` с сервера для поддержки/аналитики. */
export async function postFeedbackToApi(payload: FeedbackInput): Promise<void> {
	const response = await fetch('/api/feedback', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		return;
	}

	const fromHeader = readCorrelation(response.headers.get('X-Correlation-Id'));
	const bodyText = await response.text();
	const parsed = parseErrorBody(bodyText);
	const message =
		typeof parsed.message === 'string' && parsed.message.length > 0 ? parsed.message : `Ошибка ${response.status}`;

	const correlationId =
		typeof parsed.correlationId === 'string' && parsed.correlationId.length > 0 ? parsed.correlationId : fromHeader;

	throw new PostFeedbackError(response.status, message, correlationId);
}
