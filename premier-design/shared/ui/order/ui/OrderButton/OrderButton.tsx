import React, {FC, useCallback} from 'react';
import dynamic from 'next/dynamic';

import {trackMarketingEvent} from '@shared/analytics/trackMarketingEvent';
import PanelButton from '@features/buttons-panel/ui/PanelButton/PanelButton';
import {useFeedback} from '@shared/ui/order/hooks/useFeedback';
import {OrderButtonProps} from '@shared/ui/order/interface/OrderButton.props';

import styles from './OrderButton.module.css';

const FeedbackModal = dynamic(() => import('@shared/ui/order/ui/FeedbackModal/FeedbackModal'), {
	ssr: false,
	loading: () => null,
});

const OrderButton: FC<OrderButtonProps> = ({buttonData, buttonStyle, panelData, prefilledMessage, trackingContext}: OrderButtonProps) => {
    const {isOpen, openModal, openModalWithMessage, closeModal, handleSubmit, initialMessage, error, isSuccess} = useFeedback();
    const buttonClass = styles[buttonStyle];

    const handleOpenModal = useCallback(() => {
        if (trackingContext) {
            trackMarketingEvent('cta_open_order_modal', {
                context: trackingContext,
                buttonStyle,
            });
        }

        if (openModalWithMessage) {
            openModalWithMessage(prefilledMessage);
            return;
        }

        openModal();
    }, [buttonStyle, openModal, openModalWithMessage, prefilledMessage, trackingContext]);

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
            {isSuccess && (
                <p className={styles.success} role='status' aria-live='polite'>
                    Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                </p>
            )}
        </>
    );
};

export default OrderButton;


