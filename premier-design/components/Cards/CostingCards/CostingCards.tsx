import React from 'react';
import styles from './CostingCards.module.css';
import { CostingCardsProps } from './CostingCards.props';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useResizeEffects';
import Link from 'next/link';

const CostingCards: React.FC<{ data: CostingCardsProps[] }> = ({ data }): JSX.Element => {

    const { isMobile } = useResizeEffects();
    const slidesPerView = 3;
    return (
        <div className={styles.costing__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
            {data.map(({ id, title, image}: CostingCardsProps) => (
                    <Link href="/about" className={styles.costing__card} key={id}>
                        <div className={styles.card__background}>
                            <img src={image} alt={title} className={styles.background}/>
                        </div>
                        <div className={styles.card__title}>{title}</div>
                    </Link>
                ))}
            </SliderComponent>
        </div>
    );
};

export default CostingCards;
