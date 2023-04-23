import React from 'react';
import styles from './Approach.module.css';
import Title from '../Title/Title';
import { titleList } from '../Title/TitleList';
import ApproachCards from '../Cards/ApproachCards/ApproachCards';

const Approach = (): JSX.Element => {
    const { title, description } = titleList[2];
    return (
        <section className={styles.approach}>
            <div className={styles.approach__container}>
                <Title
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