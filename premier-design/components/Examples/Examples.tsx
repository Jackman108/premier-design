import React from 'react';
import styles from './Examples.module.css';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../Title/Title';
import { findTitle } from '../../pages/api/constants';
import { DataProps } from '../../interface/interfaceData';

const Examples: React.FC<{ data: DataProps }> = ({
    data
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 4) || {};
    return (
        <section className={styles.examples}>
            <div className={styles.examples__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description} />
                <ExamplesCards data={data.cards.examplesCard} />
            </div>
        </section>
    );
};
export default Examples;
