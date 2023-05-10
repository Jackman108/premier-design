import React from 'react';
import styles from './ServicesCards.module.css';

const ServicesCards: React.FC<{ data: ServiceProps[] }> = ({ data }): JSX.Element => {
    return (
        <div className={styles.services__cards}>
            {data.map(({ id, text, image }: ServiceProps) => (
                <div className={styles.services__card} key={id}>
                    <div className={styles.card__title}>
                        {text}
                    </div>
                    <div className={styles.card__image}>
                        <img
                            src={image}
                            alt={text}
                            className={styles.image__background}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ServicesCards;