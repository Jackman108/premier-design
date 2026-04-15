import React, {FC, useCallback} from 'react';

import PanelButton from '@features/buttons-panel/ui/PanelButton/PanelButton';
import {useFeedback} from '@shared/ui/order/hooks/useFeedback';
import {OrderButtonProps} from '@shared/ui/order/interface/OrderButton.props';
import FeedbackModal from '@shared/ui/order/ui/FeedbackModal/FeedbackModal';

import styles from './OrderButton.module.css';

const OrderButton: FC<OrderButtonProps> = ({buttonData, buttonStyle, panelData, prefilledMessage}: OrderButtonProps) => {
    const {isOpen, openModal, openModalWithMessage, closeModal, handleSubmit, initialMessage, error} = useFeedback();
    const buttonClass = styles[buttonStyle];

    const handleOpenModal = useCallback(() => {
        if (openModalWithMessage) {
            openModalWithMessage(prefilledMessage);
            return;
        }

        openModal();
    }, [openModal, openModalWithMessage, prefilledMessage]);

    return (
        <>
            {buttonStyle === 'button-panel' && panelData ? (
                <PanelButton {...panelData} onClick={handleOpenModal}/>
            ) : (
                buttonData && (
                    <button
                        className={`${styles['button-base']} ${buttonClass}`}
                        type='button'
                        onMouseDown={handleOpenModal}
                        aria-label='Сделать заказ'
                    >
                        {buttonData}
                    </button>
                )
            )}
            {isOpen && <FeedbackModal onClose={closeModal} onSubmit={handleSubmit} initialMessage={initialMessage}/>}
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
};

export default OrderButton;


