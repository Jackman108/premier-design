import styles from './OrderButton.module.css';
import FeedbackModal from '../../FeedbackModal/FeedbackModal';
import {OrderButtonProps} from '../../../interface/OrderButton.props';
import React, {FC} from 'react';
import {FeedbackItem} from '../../../interface/FeedbackModal.props';
import {useOrderButton} from "../../../hooks/useOrderButton";
import PanelButton from "../PanelButton/PanelButton";

const OrderButton: FC<OrderButtonProps> = ({
                                               buttonData,
                                               buttonStyle,
                                               panelData
                                           }: OrderButtonProps) => {

    const {state, handleButtonClick, handleModalClose, handleSubmit} = useOrderButton();

    const buttonClass = styles[buttonStyle];
    return (
        <>
                {buttonData && buttonStyle !== 'button-panel' && (
                    <button
                        className={buttonClass}
                        type="button"
                        onMouseDown={handleButtonClick}
                    >
                        {buttonData}
                    </button>
                )}
                {panelData && buttonStyle === 'button-panel' && (
                    <PanelButton
                        id={panelData.id}
                        onClick={handleButtonClick}
                        icon={panelData.icon}
                        altText={panelData.altText}
                        text={panelData.text}
                        position={panelData.position}
                    />
                )}

                  {state.showModal && (
                      <FeedbackModal
                          onClose={handleModalClose}
                          onSubmit={(data: FeedbackItem) => handleSubmit(data)}
                      />
                  )}
                  {state.error && <p className={styles.error}>{state.error}</p>}
        </>
    );
};
export default OrderButton;