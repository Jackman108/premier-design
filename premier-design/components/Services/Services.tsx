import React, { FC } from 'react';
import styles from './Services.module.css';
import OrderButton from '../UX/OrderButton/OrderButton';
import ServicesCards from '../Cards/ServicesCards/ServicesCards';
import Title from '../Title/Title';
import data from '../../data/data.json';

const Services: FC = (): JSX.Element => {
    const foundTitle = data.title.find((item: { id: number }): boolean => item.id === 2);
    const title = foundTitle?.title ?? '';
    const description = foundTitle?.description ?? '';
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <Title
                    id={foundTitle?.id ?? 2}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ServicesCards data={data.list.services} />
                <OrderButton buttonStyle='button-black' />
            </div>
        </section>
    );
};
export default Services;