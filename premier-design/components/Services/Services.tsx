import React from 'react';
import styles from './Services.module.css';
import { titleList } from '../Title/TitleList';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../ServicesCards/ServicesCards';
import Title from '../Title/Title';

const Services = (): JSX.Element => {
    const { title, description } = titleList[1];
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title 
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