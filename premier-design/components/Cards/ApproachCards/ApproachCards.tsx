import React from 'react';
import styles from './ApproachCards.module.css';

const ApproachCards: React.FC<{ data: ApproachProps[] }> = ({ data }): JSX.Element => {
    return (
        <div className={styles.approach__cards}>
            {data.map(({id, image, title, description}) => (
                <div className={styles.approach__card} key={id}>
                    <div className={styles.card__image}>
                        <img src={image} alt={image} />
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