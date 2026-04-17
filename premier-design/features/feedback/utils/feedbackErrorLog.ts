/** Безопасное логирование сбоя отправки feedback (без полного объекта ошибки / стека в логах). */
export function logFeedbackSubmissionFailure(message: string, correlationId: string): void {
	console.error(`[submitFeedback] correlationId=${correlationId} message=${message}`);
}

export function newFeedbackCorrelationId(): string {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID();
	}
	return `fb-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
