import React from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import { bannerList } from './BannerList';

const { content, description } = bannerList[0];

const Banner: React.FC = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner__container}>
                <h1 className={styles.banner__title}>{content}</h1>
                <p className={styles.banner__description}>{description}</p>
                <OrderButton />
            </div>
        </section>
    );
};
export default Banner;