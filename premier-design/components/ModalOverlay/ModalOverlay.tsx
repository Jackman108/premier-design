import styles from './ModalOverlay.module.css';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import { useState } from 'react';
import { FeedbackItem } from '../FeedbackForm/FeedbackForm.props';

interface ModalOverlayProps {
    onClose: () => void;
    onSubmit: (data: FeedbackItem) => Promise<void>;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
    onClose,
    onSubmit
}) => {
    const [formDataStateLocal, setFormDataStateLocal] = useState<FeedbackItem>({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataStateLocal({
            ...formDataStateLocal,
            [event.target.name]: event.target.value,
        });
    };

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.modal_top}>
                    <h1 className={styles.modal_text}>Введите Ваши актульные данные</h1>
                    <button className={styles.closeButton} type="button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.modal__container}>
                    <FeedbackForm
                        onInputChange={handleInputChange}
                        onSubmit={() => onSubmit(formDataStateLocal)}
                        formDataState={formDataStateLocal}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalOverlay;