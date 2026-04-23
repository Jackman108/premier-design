import {FeedbackInput} from '../schema';
import {escapeHtml} from '../../../shared/lib/sanitize';
import {feedbackDal, FeedbackDal} from '../../../services/dal/feedbackDal';
import {logFeedbackSubmissionFailure, newFeedbackCorrelationId} from '../utils/feedbackErrorLog';
import {retryAsync} from '../../../shared/lib/retryAsync';
import {
    isIntegrationCircuitOpenError,
    runWithIntegrationCircuit,
    type IntegrationCircuitConfig,
} from '../../../shared/lib/integrationCircuit';

const FEEDBACK_CIRCUIT_SMTP = 'feedback-smtp';
const FEEDBACK_CIRCUIT_TELEGRAM = 'feedback-telegram';

const toPositiveInt = (raw: string | undefined, fallback: number) => {
    const n = raw !== undefined ? Number.parseInt(raw, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : fallback;
};

const resolveIntegrationCircuitConfig = (): IntegrationCircuitConfig => ({
    enabled: process.env.FEEDBACK_CIRCUIT_ENABLED !== 'false',
    failureThreshold: toPositiveInt(process.env.FEEDBACK_CIRCUIT_FAILURE_THRESHOLD, 5),
    openDurationMs: toPositiveInt(process.env.FEEDBACK_CIRCUIT_OPEN_MS, 60_000),
});

export interface SubmitFeedbackResult {
    status: 'success' | 'error';
    message: string;
    error?: string;
    code?: 500 | 503;
}

export const submitFeedback = async (data: FeedbackInput, dal: FeedbackDal = feedbackDal): Promise<SubmitFeedbackResult> => {
    try {
        const safeName = escapeHtml(data.name);
        const safePhone = escapeHtml(data.phone);
        const safeEmail = escapeHtml(data.email || 'Не указан');
        const safeMessage = escapeHtml(data.message);
        const maxAttempts = 2;
        const baseDelayMs = 250;

        const circuitConfig = resolveIntegrationCircuitConfig();

        if (dal.isDevelopment()) {
            dal.saveDebugPayload(data);
            await runWithIntegrationCircuit(FEEDBACK_CIRCUIT_SMTP, circuitConfig, () =>
                retryAsync(
                    async () => {
                        await dal.sendFeedbackEmail({
                            safeName,
                            safePhone,
                            safeEmail,
                            safeMessage,
                            rawEmail: data.email || '',
                        });
                    },
                    {maxAttempts, baseDelayMs},
                ),
            );
        }

        const message = `
        <b>Новое сообщение с формы:</b>
        - <b>Имя:</b> ${safeName}
        - <b>Телефон:</b> ${safePhone}
        - <b>Email:</b> ${safeEmail}
        - <b>Сообщение:</b> ${safeMessage}
        `.trim();

        await runWithIntegrationCircuit(FEEDBACK_CIRCUIT_TELEGRAM, circuitConfig, () =>
            retryAsync(async () => {
                await dal.sendTelegramMessage(message);
            }, {maxAttempts, baseDelayMs}),
        );

        return {status: 'success', message: 'Feedback processed successfully.'};
    } catch (error) {
        if (isIntegrationCircuitOpenError(error)) {
            const correlationId = newFeedbackCorrelationId();
            logFeedbackSubmissionFailure('circuit_open: интеграция временно отключена', correlationId);
            return {
                status: 'error',
                message: 'Сервис временно недоступен. Попробуйте повторно через минуту.',
                error: error.message,
                code: 503,
            };
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const correlationId = newFeedbackCorrelationId();
        logFeedbackSubmissionFailure(errorMessage, correlationId);
        return {status: 'error', message: 'Failed to process the feedback.', error: errorMessage};
    }
};
