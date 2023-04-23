import React from 'react';
import styles from './ServicesCards.module.css';
import { servicesList } from './ServicesCardsList';



const ServicesCards = (): JSX.Element => {
    return (
        <div className={styles.services__cards}>
            {servicesList.map((serviceItem, index) => (
                <div className={styles.services__card} key={index}>
                    <div className={styles.title__card}>
                        {serviceItem.text}
                    </div>
                    <div className={styles.image__card}>
                        <img
                            src={serviceItem.image}
                            alt={serviceItem.text}
                            className={styles.image__background}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ServicesCards;