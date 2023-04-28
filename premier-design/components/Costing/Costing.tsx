import React from 'react';
import styles from './Costing.module.css';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../Title/Title';
import Data from '../../data/data.json';

const Costing = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 5);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
                <Title
                    id={5}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <CostingCards />
            </div>
        </section>
    );
};
export default Costing;
