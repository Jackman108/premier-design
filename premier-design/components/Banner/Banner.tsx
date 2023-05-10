import React, { FC } from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import { OrderButtonProps } from '../UX/OrderButton/OrderButton.props';
import Image, { ImageProps } from 'next/image';
import { TitleStyleProps } from '../Title/TitleStyle.props';

type BannerProps = TitleStyleProps & OrderButtonProps & {
    bannerImg: ImageProps
}

const Banner: FC<BannerProps> = ({
    id,
    title,
    description,
    titleStyle,
    descriptionStyle,
    buttonHeader,
    buttonStyle,
    bannerImg
}): JSX.Element => {
    return (
        <section className={styles.banner}>
            <div className={`${styles.banner__background} banner__background`}>
                <Image priority={true} {...bannerImg} className={styles.banner__background} />
            </div>
            <div className={styles.banner__container}>
                <Title
                    id={id}
                    titleStyle={titleStyle}
                    descriptionStyle={descriptionStyle}
                    title={title}
                    description={description}
                />
                <OrderButton
                    buttonHeader={buttonHeader}
                    buttonStyle={buttonStyle}
                />
            </div>
        </section>
    );
};
export default Banner;