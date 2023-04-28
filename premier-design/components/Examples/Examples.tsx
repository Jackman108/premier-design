import React from 'react';
import styles from './Examples.module.css';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../Title/Title';
import Data from '../../data/data.json';

const Examples = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 4);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    return (
        <section className={styles.examples}>
            <div className={styles.examples__container}>
                <Title 
                id={4}
                titleStyle='title-black' 
                descriptionStyle='description-black' 
                title={title} 
                description={description} />
                <ExamplesCards />               
            </div>
        </section>
    );
};
export default Examples;
