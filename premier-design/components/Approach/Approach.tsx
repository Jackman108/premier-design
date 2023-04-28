import React from 'react';
import styles from './Approach.module.css';
import Title from '../Title/Title';
import ApproachCards from '../Cards/ApproachCards/ApproachCards';
import Data from '../../data/data.json';

const Approach = (): JSX.Element => {
    const findData = Data.title.find((item) => item.id === 3);
    const title = findData ? findData.title : '';
    const description = findData ? findData.description : '';
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title
                    id={3}
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                />
                <ApproachCards />
            </div>
        </section >
    );
};
export default Approach;