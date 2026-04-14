import React, {FC, ReactElement} from 'react';
import styles from './Examples.module.css';
import SliderComponent from '@shared/ui/slider/ui/Slider';
import Title from '@shared/ui/title/ui/Title';
import ExampleCard from "../ExamplesCard/ExampleCard";
import {ExamplesProps} from "@features/examples/interface/Examples.props";
import {useExamplesLogic} from "@features/examples/hooks/useExamplesLogic";
import AsyncPhotoViewer from "@features/examples/ui/PhotoViewer/AsyncPhotoViewer";

const Examples: FC<ExamplesProps> = ({cards, title}): ReactElement => {
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
                    title={title.title}
                    description={title.description}
                    shortTitle={title.shortTitle}
                />
                <div className={styles.examples__cards}>
                    {
                        <SliderComponent slidesPerView={slidesPerView} isMobile={isMobile}>
                            {memoizedCards.map((card) => (
                                <ExampleCard
                                    card={card}
                                    onClick={handleCardClick}
                                    key={card.id}
                                />
                            ))}
                        </SliderComponent>
                    }
                    {isViewerOpen && selectedImage && (
                        <AsyncPhotoViewer
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
