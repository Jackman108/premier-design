import React from 'react';
import styles from './Banner.module.css';
import { BannerProps } from './Banner.props';



const Banner: React.FC<BannerProps> = ({ title, description }) => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner__container}>
                <h1 className={styles.banner__title}>{title}</h1>
                <p className={styles.banner__description}>{description}</p>
            </div>
        </section>
    );
};

export default Banner;