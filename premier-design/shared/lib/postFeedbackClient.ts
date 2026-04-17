import type {FeedbackInput} from '@shared/validates/feedbackSchema';

/** Клиентский адаптер к `POST /api/feedback` (вне UI-слоя). */
export async function postFeedbackToApi(payload: FeedbackInput): Promise<void> {
	const response = await fetch('/api/feedback', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
	}
}
