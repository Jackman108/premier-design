'use client'
import styles from './FeedbackModal.module.css';
import FeedbackForm from '@shared/ui/order/ui/FeedbackForm/FeedbackForm';
import {FC, MouseEvent, useEffect,} from 'react';
import {FeedbackModalProps} from '@shared/ui/order/interface/FeedbackModal.props';


const FeedbackModal: FC<FeedbackModalProps> = ({onClose, onSubmit}) => {
    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
    };

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [onClose]);

    return (
        <div className={styles.overlay} onMouseDown={handleOverlayClick}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="feedback-modal-heading"
                aria-describedby="feedback-modal-description"
            >
                <div className={styles.modal_top}>
                    <div className={styles.modal_text}>
                        <h3 id="feedback-modal-heading">Оставьте заявку</h3>
                        <p id="feedback-modal-description">Мы свяжемся в ближайшее время</p>
                    </div>
                    <button
                        className={styles.closeButton}
                        type="button"
                        onMouseDown={onClose}
                        aria-label="Закрыть форму"
                    >
                        &times;
                    </button>
                </div>
                <div className={styles.modal__container}>
                    <FeedbackForm
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;