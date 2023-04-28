import React from 'react';
import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../Title/Title';
import Data from '../../data/data.json';

const Services = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 2);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title 
                id={2}
                titleStyle='title-black' 
                descriptionStyle='description-black' 
                title={title} 
                description={description} />
                <ServicesCards />
                <OrderButton buttonStyle='button-black' />
            </div>
        </section>
    );
};
export default Services;