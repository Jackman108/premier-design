import {FC, ReactElement} from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import NextImage from 'next/image';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {DataProps,} from '../../interface/interfaceData';
import {TitleProps} from "../../interface/Title.props";
import {ButtonProps} from "../../interface/Button.props";
import {BannerImageProps} from "../../interface/Banner.props";

const Appeal: FC<{ data: DataProps }> = ({
                                             data
                                         }): ReactElement => {
    const titleData = findItemByTitle(data.title, "create-best-place") || {} as TitleProps;
    const buttonData = findItemByTitle(data.button, "leave_request") || {} as ButtonProps;
    const bannerData = findItemByTitle(data.bannersImages, "appeal_banner") || {} as BannerImageProps;

    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
                <NextImage
                    priority
                    src={bannerData.src}
                    alt={bannerData.alt}
                    quality={bannerData.quality}
                    width={bannerData.width}
                    height={508}
                    className={styles.appeal__background}
                />
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={titleData.title}
                    description={titleData.description}
                    shortTitle={titleData.shortTitle}
                />
                <OrderButton
                    buttonData={buttonData.buttonHeader}
                    buttonStyle='button-black'
                />
            </div>
        </section>
    );
};
export default Appeal;