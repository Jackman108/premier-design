import React from 'react';
import styles from './ExamplesCards.module.css';
import { examplesList } from './ExamplesCardsList';



const ExamplesCards = (): JSX.Element => {
    return (
        <div className={styles.examples__cards}>
            {examplesList.map((exampleCard, index) => (
                <div className={styles.examples__card} key={index}>
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
                </div>
            ))}
        </div>
    );
};
export default ExamplesCards;
