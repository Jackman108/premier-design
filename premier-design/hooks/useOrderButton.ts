// hooks/useOrderButton.ts
import {useCallback, useState} from 'react';
import {OrderButtonState} from "../interface/OrderButton.props";
import {FeedbackItem} from "../interface/FeedbackModal.props";

export const useOrderButton = () => {
    const initialState: OrderButtonState = {
        showModal: false,
        error: "",
    };

    const [state, setState] = useState<OrderButtonState>(initialState);

    const handleButtonClick = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            showModal: true,
        }));
    }, []);

    const handleModalClose = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            showModal: false,
        }));
    }, []);

    const handleSubmit = useCallback(async (formDataState: FeedbackItem) => {
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataState),
            });

            if (!response.ok) {
                const errorMessage = `Ошибка ${response.status}: ${response.statusText}`;
                console.error(errorMessage);
                setState((prevState) => ({
                    ...prevState,
                    error: 'Произошла ошибка при отправке формы: ' + errorMessage,
                }));
                return;
            }

            console.log("Данные успешно отправлены");
            setState((prevState) => ({
                ...prevState,
                showModal: false,
                error: "",
            }));
        } catch (error) {
            console.error(error);
            setState((prevState) => ({
                ...prevState,
                error: 'Произошла ошибка при отправке формы: ' + error,
            }));
        }
    }, []);

    return {
        state,
        handleButtonClick,
        handleModalClose,
        handleSubmit,
    };
};
