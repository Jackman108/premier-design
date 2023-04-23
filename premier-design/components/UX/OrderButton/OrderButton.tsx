import React, { useState } from 'react';
import styles from './OrderButton.module.css';
import { OrderButtonProps } from './OrderButton.props';



const OrderButton: React.FC<OrderButtonProps> = ({ buttonStyle, type, onClick }) => {
    const [buttonClass, setButtonClass] = useState(buttonStyle === 'button-black' ? styles['button-black'] : styles['button-white']);

    return (
        <button className={buttonClass} type={type} onClick={onClick}>
            Оставить заявку
        </button>
    );
};
export default OrderButton;