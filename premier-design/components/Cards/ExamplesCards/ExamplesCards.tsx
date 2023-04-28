import React from 'react';
import styles from './ExamplesCards.module.css';
import { examplesList } from './ExamplesCardsList';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useHeaderEffects';
import Link from 'next/link';

const ExamplesCards = (): JSX.Element => {
    const { isMobile } = useResizeEffects();
    const slidesPerView = 3;
    return (
        <div className={styles.examples__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {examplesList.map((exampleCard, index) => (
                    <Link href="/about" className={styles.examples__card} key={index}>
                        <div className={styles.card__background}>
                            <img src={exampleCard.background} alt={exampleCard.address} />
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.card__address}>
                                {exampleCard.address}
                            </div>
                            <div className={styles.card__deadlines}>
                                {exampleCard.deadlines}
                            </div>
                            <div className={styles.card__option}>
                                <div className={styles.card__bathroom}>
                                    <div className={styles.bathroom__icon}>
                                        <img src={exampleCard.bathroomIcon} alt='bathroom' />
                                    </div>
                                    <div className={styles.bathroom__option}>
                                        {exampleCard.bathroomOption}
                                    </div>
                                </div>
                                <div className={styles.card__area}>
                                    <div className={styles.area__icon}>
                                        <img src={exampleCard.areaIcon} alt='bathroom' />
                                    </div>
                                    <div className={styles.area__option}>
                                        {exampleCard.areaOption}
                                    </div>
                                    <div className={styles.area__square}>
                                        {exampleCard.areaSquare}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </SliderComponent>
        </div>
    );
};
export default ExamplesCards;
