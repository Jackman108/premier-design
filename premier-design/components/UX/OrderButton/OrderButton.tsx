import React, { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react';
import styles from './OrderButton.module.css';
import ModalOverlay from '../../ModalOverlay/ModalOverlay';
import { FeedbackItem } from '../../FeedbackForm/FeedbackForm.props';
interface OrderButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    buttonStyle: 'button-white' | 'button-black' | 'button-none';
    buttonHeader?: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
    buttonHeader,
    buttonStyle,
}) => {
    const buttonClass = styles[buttonStyle];
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleSubmit = async (formDataState: FeedbackItem): Promise<void> => {
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataState),
            });
            if (!response.ok) {
                setError('Произошла ошибка при отправке формы');
                console.error(`Ошибка ${response.status}: ${response.statusText}`);
                return;
            }
            console.log("Данные успешно отправлены")
            setShowModal(false);
        } catch (error) {
            setError("Произошла ошибка при отправке формы");
            console.error(error);
        }
    };

    return (
        <>
            <button
                className={buttonClass}
                type="button"
                onClick={handleButtonClick}
            >
                {buttonHeader}
            </button>
            {showModal && (
                <ModalOverlay
                    onClose={handleModalClose}
                    onSubmit={(data: FeedbackItem) => handleSubmit(data)}
                />
            )}
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
};
export default OrderButton;