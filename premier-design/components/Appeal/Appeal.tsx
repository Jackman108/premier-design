import { FC } from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import NextImage from 'next/image';
import { findTitle, bannerImageSettings, findButton } from '../../pages/api/constants';

const Appeal: FC<{ data: DataProps }> = ({ 
    data 
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 6) || {};
    const buttonHeader = findButton(data, 0);
    const bannerImg = bannerImageSettings(data, 3);
    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
            <NextImage
                    {...bannerImg}
                    className={styles.appeal__background}
                    width={1920}
                    height={508}
                    loading='lazy'
                />
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-white'
                    title={title}
                    description={description} />
                <OrderButton buttonHeader={buttonHeader} buttonStyle='button-white' />
            </div>
        </section>
    );
};
export default Appeal;