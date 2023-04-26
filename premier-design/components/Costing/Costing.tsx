import React from 'react';
import styles from './Costing.module.css';
import { titleList } from '../Title/TitleList';
import CostingCards from '../Cards/CostingCards/CostingCards';
import Title from '../Title/Title';
import ArrowButton from '../UX/ArrowButton/ArrowButton';

const Costing = (): JSX.Element => {
    const { title, description } = titleList[4];
    return (
        <section className={styles.costing}>
            <div className={styles.costing__container}>
                <Title
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
