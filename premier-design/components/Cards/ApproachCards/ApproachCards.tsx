import React from 'react';
import styles from './ApproachCards.module.css';
import { ApproachList } from './ApproachCardsList';

const ApproachCards = (): JSX.Element => {
    return (
        <div className={styles.approach__cards}>
            {ApproachList.map((approachCard, index) => (
                <div className={styles.approach__card} key={index}>
                    <div className={styles.card__image}>
                        <img src={approachCard.image} alt={approachCard.image} />
                    </div>
                    <div className={styles.card__title}>
                        {approachCard.title}
                    </div>
                    <div className={styles.card__description}>
                        {approachCard.description}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ApproachCards;