import React from 'react';
import styles from './Services.module.css';
import { servicesList } from './ServicesList';
import { titleList } from '../Title/TitleList';
import OrderButton from '../UX/OrderButton/OrderButton';

const { title, description } = titleList[0];

const Services = ( ): JSX.Element => {
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <h1 className={styles.services__title}>{title}</h1>
                <p className={styles.services__description}>{description}</p>
                <div className={styles.services__cards}>                  
                        {servicesList.map((serviceItem, index) => (
                            <div className={styles.item__card} key={index}>
                                <div className={styles.title__card}>
                                    {serviceItem.text}                                </div>
                                <div className={styles.image__card}>
                                    <img
                                        src={serviceItem.image}
                                        alt={serviceItem.text}
                                        className={styles.image__background}
                                    />
                                </div>
                            </div>
                        ))}                   
                </div>
                <OrderButton className={styles.button}/>
            </div>
        </section>
    );
};
export default Services;