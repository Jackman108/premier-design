import React from 'react';
import styles from './Appeal.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import Title from '../Title/Title';
import Data from '../../data/data.json';

const Appeal = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 2);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    return (
        <section className={styles.appeal}>
            <div className={styles.appeal__container}>
                <Title
                    id={6}
                    titleStyle='title-black'
                    descriptionStyle='description-white'
                    title={title}
                    description={description} />
                <OrderButton buttonStyle='button-white' />
            </div>
        </section>
    );
};
export default Appeal;