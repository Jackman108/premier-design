import React from 'react';
import styles from './CostingCards.module.css';
import { costingList } from './CostingCardsList';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useHeaderEffects';


const CostingCards = (): JSX.Element => {
    const { isMobile } = useResizeEffects();
    const slidesPerView = isMobile ? 1 : 3;
    return (
        <div className={styles.costing__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {costingList.map((costingCard, index) => (
                    <div className={styles.costing__card} key={index}>
                        <div className={styles.card__background}>
                            <img src={costingCard.image} alt={costingCard.title} className={styles.background}/>
                        </div>
                        <div className={styles.card__title}>{costingCard.title}</div>
                    </div>
                ))}
            </SliderComponent>
        </div>
    );
};

export default CostingCards;
