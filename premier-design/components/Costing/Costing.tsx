import React from 'react';
import styles from './Costing.module.css';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../Title/Title';
import data from '../../data/data.json';

const Costing = (): JSX.Element => {
    const foundTitle = data.title.find((item: { id: number }): boolean => 
    item.id === 5);
    const title = foundTitle?.title ?? '';
    const description = foundTitle?.description ?? '';
    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
            <Title
                    id={foundTitle?.id ?? 5}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <CostingCards data={data.list.costing}/>
            </div>
        </section>
    );
};
export default Costing;
