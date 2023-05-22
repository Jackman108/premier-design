import { FC } from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import { OrderButtonProps } from '../UX/OrderButton/OrderButton.props';
import NextImage, { ImageProps } from 'next/image';

type BannerProps = TitleProps & OrderButtonProps & {
    bannerImg: ImageProps
}
const Banner: FC<BannerProps> = ({
    id,
    title,
    description,
    buttonHeader,
    bannerImg
}): JSX.Element => {
    const { width, height, quality, ...otherImageProps } = bannerImg;

    return (
        <section className={styles.banner}>
            <NextImage
                priority
                {...otherImageProps}
                className={styles.banner__background}
                width={width}
                height={height}
                quality={quality}
            />
            <div className={styles.banner__container}>
                <Title
                    id={id}
                    titleStyle='title-white'
                    descriptionStyle='description-white'
                    title={title}
                    description={description}
                />
                <OrderButton
                    buttonHeader={buttonHeader}
                    buttonStyle='button-white'
                />
            </div>
        </section>
    );
};
export default Banner;