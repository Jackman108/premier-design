import React from 'react';
import styles from './ServicesCards.module.css';
import Link from 'next/link';

const ServicesCards: React.FC<{ data: ServiceCardProps[] }> = ({ data }): JSX.Element => {
    return (
        <div className={styles.services__cards}>
            {data.map(({ id, text, image, href }: ServiceCardProps) => (
                <Link href={href} className={styles.services__card} key={id}>
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
                </Link>
            ))}
        </div>
    );
};
export default ServicesCards;