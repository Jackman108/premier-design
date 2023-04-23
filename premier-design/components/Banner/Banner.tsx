import React from 'react';
import styles from './Banner.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import { titleList } from '../Title/TitleList';
import Title from '../Title/Title';

const { title, description } = titleList[0];

const Banner: React.FC = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.banner__container}>
            <Title titleStyle='title-white' descriptionStyle='description-white' title={title} description={description}/>
            <OrderButton buttonStyle='button-white' />
            </div>
        </section>
    );
};
export default Banner;