import React from 'react';
import styles from './ExamplesCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useResizeEffects';
import Link from 'next/link';

const ExamplesCards: React.FC<{ data: ExampleProps[] }> = ({ data }): JSX.Element => {
    const { isMobile } = useResizeEffects();
    const slidesPerView = 3;
    return (
        <div className={styles.examples__cards}>
            <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                {data.map((example, id) => (
                    <Link href="/about" className={styles.examples__card} key={id}>
                        <div className={styles.card__background}>
                            <img src={example.background} alt={example.address} />
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.card__address}>
                                {example.address}
                            </div>
                            <div className={styles.card__deadlines}>
                                {example.deadlines}
                            </div>
                            <div className={styles.card__option}>
                                <div className={styles.card__bathroom}>
                                    <div className={styles.bathroom__icon}>
                                        <img src={example.bathroomIcon} alt='bathroom' />
                                    </div>
                                    <div className={styles.bathroom__option}>
                                        {example.bathroomOption}
                                    </div>
                                </div>
                                <div className={styles.card__area}>
                                    <div className={styles.area__icon}>
                                        <img src={example.areaIcon} alt='bathroom' />
                                    </div>
                                    <div className={styles.area__option}>
                                        {example.areaOption}
                                    </div>
                                    <div className={styles.area__square}>
                                        {example.areaSquare}
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
