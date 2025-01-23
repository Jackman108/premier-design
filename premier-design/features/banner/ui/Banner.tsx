import {FC} from 'react';
import styles from './Banner.module.css';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import Title from '@shared/ui/title/ui/Title';
import Image from 'next/image';
import {BannerProps} from "@features/banner/interface/Banner.props";

const Banner: FC<BannerProps> = ({bannerData, buttonData, titleData}) => {
    return (
        <section className={styles.banner}>
            <Image
                priority={true}
                src={bannerData.src}
                alt={bannerData.alt}
                quality={bannerData.quality}
                width={bannerData.width}
                height={bannerData.height}
                sizes="
                (max-width: 600px) 100vw,
                (max-width: 1440px) 60vw,
                1935px
                "
                placeholder='empty'
                className={styles.banner__background}
            />
            <div className={styles.banner__container}>
                <Title
                    id={titleData.id}
                    titleStyle='title-white'
                    descriptionStyle='description-white'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}

                />
                <OrderButton
                    buttonData={buttonData.buttonHeader}
                    buttonStyle={'button-white'}
                />
            </div>
        </section>
    );
};
export default Banner;