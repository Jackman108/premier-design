import React, { useState } from 'react';
import styles from './OrderButton.module.css';
import { OrderButtonProps } from './OrderButton.props';



const OrderButton: React.FC<OrderButtonProps> = ({ buttonHeader, buttonStyle, onClick }) => {
    const [buttonClass, setButtonClass] = useState(() => {
        switch (buttonStyle) {
            case 'button-black':
                return styles['button-black'];
            case 'button-white':
                return styles['button-white'];
            case 'button-none':
                return styles['button-none'];
            default:
                return '';
        }
    });

    return (
        <button className={buttonClass} type='button' onClick={onClick}>
            {buttonHeader}
        </button>
    );
};
export default OrderButton;