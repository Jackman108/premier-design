import styles from './OrderButton.module.css';
import FeedbackModal from '@shared/ui/order/ui/FeedbackModal/FeedbackModal';
import {OrderButtonProps} from '@shared/ui/order/interface/OrderButton.props';
import React, {FC} from 'react';
import {useFeedback} from "@shared/ui/order/hooks/useFeedback";
import PanelButton from "@features/buttons-panel/ui/PanelButton/PanelButton";


const OrderButton: FC<OrderButtonProps> = ({buttonData, buttonStyle, panelData}: OrderButtonProps) => {
    const {isOpen, openModal, closeModal, handleSubmit, error} = useFeedback();
    const buttonClass = styles[buttonStyle];

    return (
        <>
            {buttonStyle === 'button-panel' && panelData ? (
                <PanelButton {...panelData} onClick={openModal}/>
            ) : (
                buttonData && (
                    <button
                        className={`${styles['button-base']} ${buttonClass}`}
                        type="button"
                        onMouseDown={openModal}
                        aria-label="Сделать заказ"
                    >
                        {buttonData}
                    </button>
                )
            )}
            {isOpen && <FeedbackModal onClose={closeModal} onSubmit={handleSubmit}/>}
            {error && <p className={styles.error}>{error}</p>}
        </>
    );
};

export default OrderButton;