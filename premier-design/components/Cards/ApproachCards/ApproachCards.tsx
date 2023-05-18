import React from 'react';
import styles from './ApproachCards.module.css';
import Image from 'next/image';

const ApproachCards: React.FC<{ data: ApproachCardProps[] }> = ({ data }): JSX.Element => {
    return (
        <div className={styles.approach__cards}>
            {data.map(({ id, image, title, description }) => (
                <div className={styles.approach__card} key={id}>
                    <div className={styles.card__image}>
                        <Image 
                        src={image} 
                        alt={image} 
                        width={78}
                        height={78}
                        />
                    </div>
                    <div className={styles.card__title}>
                        {title}
                    </div>
                    <div className={styles.card__description}>
                        {description}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ApproachCards;