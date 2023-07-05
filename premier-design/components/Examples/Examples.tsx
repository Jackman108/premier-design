import React, { FC } from 'react';
import styles from './Examples.module.css';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../UX/Title/Title';
import { findTitle } from '../../pages/api/constants';
import { DataProps } from '../../interface/interfaceData';

const Examples: FC<{ data: DataProps, enableSlider?: boolean }> = ({
    data,
    enableSlider = true,
}): JSX.Element => {
    const { title = '', description = '' } = findTitle(data, 4) || {};
    return (
        <section className={styles.examples}>
            <div className={styles.examples__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                />
                <ExamplesCards
                    data={data.cards.examplesCard}
                    enableSlider={enableSlider}
                />
            </div>
        </section>
    );
};
export default Examples;
