import React, {FC, ReactElement} from 'react';
import styles from './Examples.module.css';
import ExamplesCards from '../Cards/ExamplesCards/ExamplesCards';
import Title from '../UX/Title/Title';
import {findItemByTitle} from '../../utils/findItemByTitle';
import {ExamplesProps} from "../../interface/Examples.props";

const Examples: FC<ExamplesProps> = ({
                                         cards,
                                         titles,
                                         enableSlider = true,
                                     }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "our-works") || {};
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
                    cards={cards}
                    enableSlider={enableSlider}
                />
            </div>
        </section>
    );
};
export default Examples;
