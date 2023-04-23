import React from 'react';
import styles from './ServicesCards.module.css';
import { servicesList } from './ServicesCardsList';



const ServicesCards = (): JSX.Element => {
    return (
        <div className={styles.services__cards}>
            {servicesList.map((serviceCard, index) => (
                <div className={styles.services__card} key={index}>
                    <div className={styles.card__title}>
                        {serviceCard.text}
                    </div>
                    <div className={styles.card__image}>
                        <img
                            src={serviceCard.image}
                            alt={serviceCard.text}
                            className={styles.image__background}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ServicesCards;