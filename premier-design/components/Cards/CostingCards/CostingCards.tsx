import React from 'react';
import styles from './CostingCards.module.css';
import { costingList } from './CostingCardsList';
import Carousel from "react-multi-carousel";
import responsiveCarousel from '../../UX/ResponsiveCarousel/ResponsiveCarousel';
import "react-multi-carousel/lib/styles.css";


const CostingCards = (): JSX.Element => {
    return (
        <div className={styles.costing__cards}>
            <Carousel
                draggable={true}
                responsive={responsiveCarousel}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
            >
                {costingList.map((costingCard, index) => (
                    <div className={styles.costing__card} key={index}>
                        <div className={styles.card__background}>
                            <img src={costingCard.image} alt={costingCard.title} />
                        </div>
                        <div className={styles.card__title}>
                            {costingCard.title}
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};
export default CostingCards;
