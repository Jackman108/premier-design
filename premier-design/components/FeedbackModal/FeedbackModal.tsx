'use client'
import styles from './FeedbackModal.module.css';
import FeedbackForm from './FeedbackForm/FeedbackForm';
import {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {FeedbackItem, FeedbackModalProps} from '../../interface/FeedbackModal.props';


const ModalOverlay: FC<FeedbackModalProps> = ({
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
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormDataStateLocal({
            ...formDataStateLocal,
            [event.target.name]: event.target.value,
        });
    };

    const handleOverlayClick = (
        event: MouseEvent<HTMLDivElement>
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [onClose]);

    return (
        <div className={styles.overlay} onMouseDown={handleOverlayClick}>
            <div className={styles.modal}>
                <div className={styles.modal_top}>
                    <div className={styles.modal_text}>
                        <h3>Оставьте заявку</h3>
                        <p>Мы свяжемся в ближайшее время</p>
                    </div>

                    <button className={styles.closeButton} type="button" onMouseDown={onClose}>
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