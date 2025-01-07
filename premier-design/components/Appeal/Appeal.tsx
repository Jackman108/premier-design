import {FC, ReactElement} from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import NextImage from 'next/image';
import {DataProps,} from '../../interface/interfaceData';
import {usePageData} from "../../hooks/usePageData";

const Appeal: FC<{ data: DataProps }> = ({data}): ReactElement => {
    const {
        titleData,
        buttonData,
        bannerData
    } = usePageData(data, "create-best-place", "leave_request", "appeal_banner");

    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
                <NextImage
                    src={bannerData.src}
                    alt={bannerData.alt}
                    quality={bannerData.quality}
                    width={bannerData.width}
                    height={508}
                    sizes="
                    (max-width: 600px) 600px,
                    (max-width: 1440px) 1440px,
                    1935px
                    "
                    loading="lazy"
                    placeholder="empty"
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