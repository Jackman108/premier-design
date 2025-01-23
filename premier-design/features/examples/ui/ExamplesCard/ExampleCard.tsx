'use client'
import {FC, ReactElement} from 'react';
import styles from './ExampleCard.module.css';
import NextImage from 'next/image';
import {ExampleCardComponentProps} from "@features/examples/interface/Examples.props";

const ExampleCard: FC<ExampleCardComponentProps> = ({card, onClick}): ReactElement => {
    return (
        <div className={styles.examples__card} onClick={() => onClick(card)}>
            <div className={styles.card__background}>
                <NextImage src={card.background} alt={card.address} width={388} height={312} loading='lazy'/>
            </div>
            <div className={styles.card__content}>
                <div className={styles.card__address}>{card.address}</div>
                <div className={styles.card__deadlines}>{card.deadlines}</div>
                <div className={styles.card__option}>
                    <div className={styles.card__bathroom}>
                        <div className={styles.bathroom__icon}>
                            <NextImage src={card.bathroomIcon} alt='bathroom' width={20} height={20} loading='lazy'/>
                        </div>
                        <div className={styles.bathroom__option}>{card.bathroomOption}</div>
                    </div>
                    <div className={styles.card__area}>
                        <div className={styles.area__icon}>
                            <NextImage src={card.areaIcon} alt='area' width={20} height={20} loading='lazy'/>
                        </div>
                        <div className={styles.area__option}>{card.areaOption}</div>
                        <div className={styles.area__square}>{card.areaSquare}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ExampleCard; 
