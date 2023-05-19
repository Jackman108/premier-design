import { FC } from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import NextImage from 'next/image';

const Appeal: FC<{ data: DataProps }> = ({ 
    data 
}): JSX.Element => {
    const findData = data.title.find((item) => item.id === 6);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    const appealImg: BannerImagesProps = data.bannersImages[3];

    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
            <NextImage
                    {...appealImg}
                    className={styles.appeal__background}
                    width={1920}
                    height={508}
                    loading='lazy'
                />
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