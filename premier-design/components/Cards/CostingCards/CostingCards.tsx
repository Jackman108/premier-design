import React from 'react';
import styles from './CostingCards.module.css';
import { costingList } from './CostingCardsList';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useHeaderEffects';
import Link from 'next/link';


const CostingCards = (): JSX.Element => {
    const { isMobile } = useResizeEffects();
    const slidesPerView = 3;
    return (
        <div className={styles.costing__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {costingList.map((costingCard, index) => (
                    <Link href="/about" className={styles.costing__card} key={index}>
                        <div className={styles.card__background}>
                            <img src={costingCard.image} alt={costingCard.title} className={styles.background}/>
                        </div>
                        <div className={styles.card__title}>{costingCard.title}</div>
                    </Link>
                ))}
            </SliderComponent>
        </div>
    );
};

export default CostingCards;
