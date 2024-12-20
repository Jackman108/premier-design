import {FC, ReactElement} from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import NextImage from 'next/image';
import {findItemByShortTitle} from '../../pages/api/constants';
import {BannerData, ButtonData, DataProps, TitleData} from '../../interface/interfaceData';

const Appeal: FC<{ data: DataProps }> = ({
                                             data
                                         }): ReactElement => {
    const titleData = findItemByShortTitle(data.title, "create-best-place") || {} as TitleData;
    const buttonData = findItemByShortTitle(data.button, "leave_request") || {} as ButtonData;
    const bannerData = findItemByShortTitle(data.bannersImages, "appeal_banner") || {} as BannerData;

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