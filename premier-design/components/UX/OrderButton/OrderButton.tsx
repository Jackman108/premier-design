import React from 'react';
import styles from './OrderButton.module.css';
import { OrderButtonProps } from './OrderButton.props';



const OrderButton: React.FC<OrderButtonProps> = ({ type, children }) => {
    return (
        <button className={styles.button} type={type}>
            {children}
        </button>
    );
};
export default OrderButton;