import React, {FC, ReactElement} from 'react';
import styles from './OfferBanner.module.css';
import Image from 'next/image';
import {OfferType} from "@features/banner/offer/interface/OfferBanner.props";

const OfferBanner: FC<{ offer: OfferType }> = ({offer}): ReactElement => {
    return (
        <section className={styles.offer}>
            <div className={styles.offer__container}>
                <Image
                    priority={true}
                    src={offer.image}
                    alt={offer.shortTitle}
                    quality={75}
                    width={1563}
                    height={800}
                    placeholder="empty"
                    className={styles.offer__image}
                />
                <div className={styles.offer__text}>
                    <p className={styles.offer__title}>{offer.title}</p>
                    <ul className={styles.offer__questions}>
                        {offer.questions.map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ul>
                    <p className={styles.offer__description}>{offer.description}</p>
                    <p className={styles.offer__tips}>{offer.tips}</p>
                </div>

            </div>
        </section>
    );
};
export default OfferBanner;