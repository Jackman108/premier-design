import {createCorrelationId} from '@shared/lib/correlationId';

/** Безопасное логирование сбоя отправки feedback (без полного объекта ошибки / стека в логах). */
export function logFeedbackSubmissionFailure(message: string, correlationId: string): void {
	console.error(`[submitFeedback] correlationId=${correlationId} message=${message}`);
}

export function newFeedbackCorrelationId(): string {
	return createCorrelationId('fb');
}
