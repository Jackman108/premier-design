import React from 'react';
import styles from './CostingCards.module.css';
import { сostingList } from './CostingCardsList';



const CostingCards = (): JSX.Element => {
    return (
        <div className={styles.сosting__cards}>
            {сostingList.map((сostingCard, index) => (
                <div className={styles.сosting__card} key={index}>
                    <div className={styles.card__background}>
                        <img src={сostingCard.image} alt={сostingCard.title} />
                    </div>
                    <div className={styles.card__title}>
                        {сostingCard.title}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CostingCards;
