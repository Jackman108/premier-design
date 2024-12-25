import {FC} from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../UX/Title/Title';
import Image from 'next/image';
import {BannerProps} from "../../interface/Banner.props";


const Banner: FC<BannerProps> = ({

                                     bannerData,
                                     buttonData,
                                     titleData,
                                     buttonStyle,
                                 }) => {

    return (
        <section className={styles.banner}>
            <Image
                priority={true}
                src={bannerData.src}
                alt={bannerData.alt}
                quality={bannerData.quality}
                width={bannerData.width}
                height={bannerData.height}
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
                    buttonStyle={buttonStyle}
                />
            </div>
        </section>
    );
};
export default Banner;