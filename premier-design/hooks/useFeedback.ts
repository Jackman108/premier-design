// hooks/useOrderButton.ts
import {useCallback, useState} from 'react';
import {FeedbackItem} from "../interface/FeedbackModal.props";
import {useModalState} from "./useModalState";


export const useFeedback = () => {
    const {isOpen, openModal, closeModal} = useModalState(false);
    const [error, setError] = useState<string>("");

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

    const handleSubmit = useCallback(
        async (formData: FeedbackItem) => {
            try {
                setError("");
                await sendFeedback(formData);
                closeModal();
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
                setError(`Произошла ошибка при отправке формы: ${message}`);
            }
        },
        [sendFeedback, closeModal]
    );

    return {
        isOpen,
        openModal,
        closeModal,
        handleSubmit,
        error,
    };
};
