'use client';

import React, {FC, ReactElement} from 'react';
import styles from './Examples.module.css';
import SliderComponent from '../Slider/Slider';
import Title from '../UX/Title/Title';
import {findItemByTitle} from '../../utils/findItemByTitle';
import ExampleCard from "../Cards/ExamplesCards/ExampleCard";
import PhotoViewer from "../PhotoViewer/PhotoViewer";
import {ExamplesProps} from "../../interface/Examples.props";
import {useExamplesLogic} from "../../hooks/useExamplesLogic";

const Examples: FC<ExamplesProps> = ({
                                         cards,
                                         titles,
                                         enableSlider = true,
                                     }): ReactElement => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "our-works") || {};

    const {
        memoizedCards,
        isViewerOpen,
        selectedImage,
        slidesPerView,
        isMobile,
        handleCardClick,
        closeViewer,
    } = useExamplesLogic(cards);

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
                <div className={styles.examples__cards}>
                    {enableSlider ? (
                        <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                            {memoizedCards.map((card) => (
                                <ExampleCard
                                    card={card}
                                    onClick={handleCardClick}
                                    key={card.id}
                                />
                            ))}
                        </SliderComponent>
                    ) : (
                        <div className={styles.examples__grid}>
                            {memoizedCards.map((card) => (
                                <ExampleCard
                                    card={card}
                                    onClick={handleCardClick}
                                    key={card.id}
                                />
                            ))}
                        </div>
                    )}
                    {isViewerOpen && selectedImage && (
                        <PhotoViewer
                            images={cards.find((card) => card.images.includes(selectedImage))?.images ?? []}
                            currentImage={selectedImage}
                            onClose={closeViewer}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
export default Examples;
