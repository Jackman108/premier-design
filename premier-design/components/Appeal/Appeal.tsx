import React from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import { titleList } from '../Title/TitleList';
import Title from '../Title/Title';

const { title, description } = titleList[5];

const Appeal = (): JSX.Element => {
    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
            <Title titleStyle='title-black' descriptionStyle='description-white' title={title} description={description}/>
            <OrderButton buttonStyle='button-white' />
            </div>
        </section>
    );
};
export default Appeal;