import { FC } from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import Data from '../../data/data.json';
import Image from 'next/image';
import data from "../../data/data.json";



const Appeal: FC = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 6);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    const appealImg: BannerImagesProps = data.bannersImages[3];

    return (
        <section className={styles.appeal}>
            <div className={`${styles.appeal__background} banner__background`}>
                <Image
                    priority={true}
                    {...appealImg}
                    className={styles.appeal__background}

                />
            </div>
            <div className={styles.appeal__container}>
                <Title
                    id={6}
                    titleStyle='title-black'
                    descriptionStyle='description-white'
                    title={title}
                    description={description} />
                <OrderButton buttonHeader={'Оставить заявку'} buttonStyle='button-white' />
            </div>
        </section>
    );
};
export default Appeal;