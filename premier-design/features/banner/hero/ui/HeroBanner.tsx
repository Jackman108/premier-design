import {FC} from 'react';
import Image from 'next/image';

import {HeroBannerProps} from '@features/banner/hero/interface/HeroBannerProps';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import Title from '@shared/ui/title/ui/Title';

import styles from './HeroBanner.module.css';

const HERO_BANNER_IMAGE_SIZES = '(max-width: 768px) 100vw, 1440px';

const HeroBanner: FC<HeroBannerProps> = ({bannerData, buttonData, titleData}) => {
    return (
        <section className={styles.banner}>
            <Image
                priority={true}
                src={bannerData.src}
                alt={bannerData.alt}
                quality={bannerData.quality}
                width={bannerData.width}
                height={bannerData.height}
                sizes={HERO_BANNER_IMAGE_SIZES}
                placeholder='empty'
                className={styles.banner__background}
            />
            <div className={styles.banner__overlay} aria-hidden='true'/>

            <div className={styles.banner__container}>
                <p className={styles.banner__eyebrow}>Premium Design & Renovation</p>
                <Title
                    id={titleData.id}
                    titleStyle='title-white'
                    descriptionStyle='description-white'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />

                <ul className={styles.banner__highlights}>
                    <li>Индивидуальная концепция под ваш стиль жизни</li>
                    <li>Фиксированные сроки и прозрачный бюджет</li>
                    <li>Полное сопровождение: дизайн + реализация</li>
                </ul>

                <OrderButton
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-white'
                    trackingContext='hero_primary_cta'
                />
            </div>
        </section>
    );
};

export default HeroBanner;
