import React, {FC, ReactElement} from 'react';
import styles from './OfferBanner.module.css';
import Image from 'next/image';
import {OfferBannerViewProps} from '@features/banner/offer/interface/OfferBanner.props';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';

const OFFER_BANNER_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1563px';

const OfferBanner: FC<OfferBannerViewProps> = ({offer, ctaLabel}): ReactElement => {
    return (
        <section className={styles.offer}>
            <div className={styles.offer__container}>
                <Image
                    src={offer.image}
                    alt={offer.shortTitle}
                    quality={75}
                    width={1563}
                    height={800}
                    sizes={OFFER_BANNER_IMAGE_SIZES}
                    loading="lazy"
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
                    <div className={styles.offer__cta}>
                        <OrderButton
                            buttonData={ctaLabel}
                            buttonStyle='button-black'
                            trackingContext='offer_banner_cta'
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};
export default OfferBanner;