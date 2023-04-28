import React from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import Data from '../../data/data.json';

const Banner = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 1);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    return (
        <section className={styles.banner}>
            <div className={styles.banner__container}>
                <Title id={1} titleStyle='title-white' descriptionStyle='description-white' title={title} description={description} />
                <OrderButton buttonStyle='button-white' />
            </div>
        </section>
    );
};
export default Banner;