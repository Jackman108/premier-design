import React, { FC } from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import { OrderButtonProps } from '../UX/OrderButton/OrderButton.props';
import NextImage, { ImageProps } from 'next/image';
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
            <NextImage
                    priority={true}
                    {...bannerImg}
                    className={styles.banner__background}
                    quality={75}
                />
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