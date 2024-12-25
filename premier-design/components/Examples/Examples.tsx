import React, {FC, ReactElement} from 'react';
import styles from './Examples.module.css';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../UX/Title/Title';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {DataProps} from '../../interface/interfaceData';

const Examples: FC<{ data: DataProps, enableSlider?: boolean }> = ({
                                                                       data,
                                                                       enableSlider = true,
                                                                   }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(data.title, "our-works") || {};
    return (
        <section className={styles.examples}>
            <div className={styles.examples__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
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
