import React, {FC} from 'react';
import dynamic from 'next/dynamic';

import PanelButton from '@shared/ui/panel-button/PanelButton';
import {useFeedback} from '@shared/ui/order/hooks/useFeedback';
import {useOrderButtonOpenHandler} from '@shared/ui/order/hooks/useOrderButtonOpenHandler';
import {OrderButtonProps} from '@shared/ui/order/interface/OrderButton.props';
import {FeedbackSuccessToast} from '@shared/ui/order/ui/FeedbackSuccessToast/FeedbackSuccessToast';

import styles from './OrderButton.module.css';

const FeedbackModal = dynamic(() => import('@shared/ui/order/ui/FeedbackModal/FeedbackModal'), {
	ssr: false,
	loading: () => null,
});

const OrderButton: FC<OrderButtonProps> = ({buttonData, buttonStyle, panelData, prefilledMessage, trackingContext}: OrderButtonProps) => {
    const {isOpen, openModalWithMessage, closeModal, handleSubmit, initialMessage, error, isSuccess, successToastMs} =
        useFeedback();
    const buttonClass = styles[buttonStyle];

    const handleOpenModal = useOrderButtonOpenHandler(
        buttonStyle,
        prefilledMessage,
        trackingContext,
        openModalWithMessage,
    );

    return (
        <>
            {buttonStyle === 'button-panel' && panelData ? (
                <PanelButton {...panelData} onClick={handleOpenModal}/>
            ) : (
                buttonData && (
                    <button
                        className={`${styles['button-base']} ${buttonClass}`}
                        type='button'
                        // `onClick` надёжнее для e2e/доступности: событие одинаково работает мышью, тачем и с клавиатуры.
                        onClick={handleOpenModal}
                        aria-label='Сделать заказ'
                    >
                        {buttonData}
                    </button>
                )
            )}
            {isOpen && <FeedbackModal onClose={closeModal} onSubmit={handleSubmit} initialMessage={initialMessage}/>}
            {error && <p className={styles.error}>{error}</p>}
            <FeedbackSuccessToast open={isSuccess} durationMs={successToastMs} />
        </>
    );
};

export default OrderButton;


