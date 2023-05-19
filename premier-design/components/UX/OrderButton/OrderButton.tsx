import styles from './OrderButton.module.css';
import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import { FeedbackItem } from '../../FeedbackForm/FeedbackForm.props';
import { OrderButtonProps, OrderButtonState } from './OrderButton.props';
import { useCallback, useState } from 'react';


const OrderButton: React.FC<OrderButtonProps> = ({
    buttonHeader,
    buttonStyle,
}) => {
    const initialState: OrderButtonState = {
        showModal: false,
        error: "",
    };
    const buttonClass = styles[buttonStyle];
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
    return (
        <>
            <button
                className={buttonClass}
                type="button"
                onClick={handleButtonClick}
            >
                {buttonHeader}
            </button>
            {state.showModal && (
                <ModalOverlay
                    onClose={handleModalClose}
                    onSubmit={(data: FeedbackItem) => handleSubmit(data)}
                />
            )}
            {state.error && <p className={styles.error}>{state.error}</p>}
        </>
    );
};
export default OrderButton;