import React from 'react';
import styles from './OrderButton.module.css';
import { OrderButtonProps } from './OrderButton.props';



const OrderButton: React.FC<OrderButtonProps> = ({ type,  onClick }) => {
    return (
        <button className={styles.button} type={type} onClick={onClick}>
            Оставить заявку
        </button>
    );
};
export default OrderButton;