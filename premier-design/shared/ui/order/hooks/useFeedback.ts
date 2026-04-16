import {useCallback, useState} from 'react';

import {trackMarketingEvent} from '@shared/analytics/trackMarketingEvent';
import {useModalState} from '@shared/hooks/useModalState';
import {FeedbackItem} from '@shared/ui/order/interface/FeedbackModal.props';

export const useFeedback = () => {
    const {isOpen, openModal, closeModal} = useModalState(false);
    const [error, setError] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [initialMessage, setInitialMessage] = useState<string>('');

    const sendFeedback = useCallback(async (formData: FeedbackItem) => {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
        }
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
    };
};
