import {useCallback, useEffect, useState} from 'react';

import {trackMarketingEvent} from '@shared/analytics/trackMarketingEvent';
import {useModalState} from '@shared/hooks/useModalState';
import {PostFeedbackError, postFeedbackToApi} from '@shared/lib/postFeedbackClient';
import {FEEDBACK_SUCCESS_TOAST_MS} from '@shared/ui/order/constants';
import {FeedbackItem} from '@shared/ui/order/interface/FeedbackModal.props';

export const useFeedback = () => {
    const {isOpen, openModal, closeModal} = useModalState(false);
    const [error, setError] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [initialMessage, setInitialMessage] = useState<string>('');

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        const id = window.setTimeout(() => setIsSuccess(false), FEEDBACK_SUCCESS_TOAST_MS);
        return () => window.clearTimeout(id);
    }, [isSuccess]);

    const sendFeedback = useCallback(async (formData: FeedbackItem) => {
        await postFeedbackToApi(formData);
    }, []);

    const openModalWithMessage = useCallback((message?: string) => {
        setError('');
        setIsSuccess(false);
        setInitialMessage(message?.trim() ?? '');
        openModal();
    }, [openModal]);

    const handleCloseModal = useCallback(() => {
        closeModal();
        setInitialMessage('');
        setError('');
    }, [closeModal]);

    const handleSubmit = useCallback(
        async (formData: FeedbackItem) => {
            try {
                setError('');
                await sendFeedback(formData);
                setIsSuccess(true);
                trackMarketingEvent('feedback_form_submit_success', {
                    hasEmail: Boolean(formData.email),
                    hasPrefilledMessage: Boolean(initialMessage),
                });
                closeModal();
                setInitialMessage('');
            } catch (err: unknown) {
                if (err instanceof PostFeedbackError) {
                    const ref = err.correlationId
                        ? ` (код обращения: ${err.correlationId})`
                        : '';
                    setError(`Произошла ошибка при отправке формы: ${err.message}${ref}`);
                    trackMarketingEvent('feedback_form_submit_error', {
                        reason: err.message,
                        status: err.statusCode,
                        correlationId: err.correlationId,
                    });
                    return;
                }
                const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
                setError(`Произошла ошибка при отправке формы: ${message}`);
                trackMarketingEvent('feedback_form_submit_error', {reason: message});
            }
        },
        [closeModal, initialMessage, sendFeedback],
    );

    return {
        isOpen,
        openModal,
        openModalWithMessage,
        closeModal: handleCloseModal,
        handleSubmit,
        initialMessage,
        error,
        isSuccess,
        successToastMs: FEEDBACK_SUCCESS_TOAST_MS,
    };
};
