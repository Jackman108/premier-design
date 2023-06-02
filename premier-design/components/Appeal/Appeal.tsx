import { FC } from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import NextImage from 'next/image';
import { findTitle, bannerImageSettings, findButton } from '../../pages/api/constants';
import { DataProps } from '../../interface/interfaceData';

const Appeal: FC<{ data: DataProps }> = ({
    data
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 6) || {};
    const buttonHeader = findButton(data, 0);
    const bannerImg = bannerImageSettings(data, 6);
    const { src = '', alt = '', quality, width } = bannerImg ?? {};

    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
                <NextImage
                    priority
                    src={src}
                    alt={alt}
                    quality={quality}
                    width={width}
                    height={508}
                    className={styles.appeal__background}   
                />
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <OrderButton buttonHeader={buttonHeader} buttonStyle='button-black' />
            </div>
        </section>
    );
};
export default Appeal;