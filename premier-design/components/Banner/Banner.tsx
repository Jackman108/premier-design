import { FC } from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import { OrderButtonProps } from '../../interface/OrderButton.props';
import Image from 'next/image';
import { BannerImagesProps, TitleProps } from '../../interface/interfaceData';

type BannerProps = TitleProps & OrderButtonProps & {
    bannerImg: BannerImagesProps | undefined
}
const Banner: FC<BannerProps> = ({
    id,
    title,
    description,
    buttonHeader,
    buttonStyle,
    bannerImg
}): JSX.Element => {
    const { src = '', alt = '', quality, width, height } = bannerImg ?? {};

    return (
        <section className={styles.banner}>
            <Image
                priority
                src={src}
                alt={alt}
                quality={quality}
                width={width}
                height={height}
                placeholder='empty'
                className={styles.banner__background}
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
                    buttonStyle={buttonStyle}
                />
            </div>
        </section>
    );
};
export default Banner;