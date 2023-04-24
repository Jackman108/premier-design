import React from 'react';
import styles from './Examples.module.css';
import { titleList } from '../Title/TitleList';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../Title/Title';

const Examples = (): JSX.Element => {
    const { title, description } = titleList[3];
    return (
        <section className={styles.examples}>
            <div className={styles.examples__container}>
                <Title 
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
