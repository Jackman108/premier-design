import {FC, ReactElement} from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import NextImage from 'next/image';
import {AppealProps} from "../../interface/Appeal.props";

const Appeal: FC<AppealProps> = ({titleItem, buttonItem, bannerItem}): ReactElement => {

    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
                <NextImage
                    src={bannerItem.src}
                    alt={bannerItem.alt}
                    quality={bannerItem.quality}
                    width={bannerItem.width}
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
export default Appeal;