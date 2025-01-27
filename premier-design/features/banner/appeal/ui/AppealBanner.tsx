import {FC, ReactElement} from 'react';
import styles from './AppealBanner.module.css';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import Title from '@shared/ui/title/ui/Title';
import NextImage from 'next/image';
import {AppealBannerProps} from "@features/banner/appeal/interface/AppealBannerProps";

const AppealBanner: FC<AppealBannerProps> = ({titleItem, buttonItem, bannerItem}): ReactElement => {
    return (
        <section className={styles.appeal}>

            <NextImage
                src={bannerItem.src}
                alt={bannerItem.alt}
                quality={bannerItem.quality}
                width={bannerItem.width}
                height={508}
                sizes="
                   (max-width: 600px) 100vw,
                (max-width: 1440px) 60vw,
                1935px
                    "
                loading="lazy"
                placeholder="empty"
                className={styles.appeal__background}
            />
            <div className={styles.appeal__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleItem.title}
                    description={titleItem.description}
                    shortTitle={titleItem.shortTitle}
                />
                <OrderButton
                    buttonData={buttonItem.buttonHeader}
                    buttonStyle='button-black'
                />
            </div>
        </section>
    );
};
export default AppealBanner;