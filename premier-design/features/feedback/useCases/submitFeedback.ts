import {FeedbackInput} from '../schema';
import {escapeHtml} from '../../../shared/lib/sanitize';
import {feedbackDal, FeedbackDal} from '../../../services/dal/feedbackDal';
import {logFeedbackSubmissionFailure, newFeedbackCorrelationId} from '../utils/feedbackErrorLog';

export interface SubmitFeedbackResult {
    status: 'success' | 'error';
    message: string;
    error?: string;
}

export const submitFeedback = async (data: FeedbackInput, dal: FeedbackDal = feedbackDal): Promise<SubmitFeedbackResult> => {
    try {
        const safeName = escapeHtml(data.name);
        const safePhone = escapeHtml(data.phone);
        const safeEmail = escapeHtml(data.email || 'Не указан');
        const safeMessage = escapeHtml(data.message);

        if (dal.isDevelopment()) {
            dal.saveDebugPayload(data);
            await dal.sendFeedbackEmail({
                safeName,
                safePhone,
                safeEmail,
                safeMessage,
                rawEmail: data.email || '',
            });
        }

        const message = `
        <b>Новое сообщение с формы:</b>
        - <b>Имя:</b> ${safeName}
        - <b>Телефон:</b> ${safePhone}
        - <b>Email:</b> ${safeEmail}
        - <b>Сообщение:</b> ${safeMessage}
        `.trim();

        await dal.sendTelegramMessage(message);

        return {status: 'success', message: 'Feedback processed successfully.'};
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const correlationId = newFeedbackCorrelationId();
        logFeedbackSubmissionFailure(errorMessage, correlationId);
        return {status: 'error', message: 'Failed to process the feedback.', error: errorMessage};
    }
};
