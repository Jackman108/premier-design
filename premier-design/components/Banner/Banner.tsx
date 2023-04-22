import React from 'react';
import styles from './Banner.module.css';
import { BannerProps } from './Banner.props';
import OrderButton from '../UX/OrderButton/OrderButton';



const Banner: React.FC<BannerProps> = ({ title, description }) => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner__container}>
                <h1 className={styles.banner__title}>{title}</h1>
                <p className={styles.banner__description}>{description}</p>
                <OrderButton type="submit">"Оставить заявку"</OrderButton>
            </div>
        </section>
    );
};
export default Banner;