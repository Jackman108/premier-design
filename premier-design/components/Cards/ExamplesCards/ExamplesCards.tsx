'use client'
import {FC, ReactElement, useCallback, useMemo, useState} from 'react';
import styles from './ExamplesCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../../hooks/useResizeEffects';
import PhotoViewer from '../../PhotoViewer/PhotoViewer';
import ExampleCard from './ExamplesCard';
import {ExampleCardProps} from "../../../interface/Cards.props";
import {ExamplesCardsProps} from "../../../interface/Examples.props";

const ExamplesCards: FC<ExamplesCardsProps> = ({
                                                   cards,
                                                   enableSlider = true,
                                               }): ReactElement => {
    const memoizedExamplesCards = useMemo(() => cards || [], [cards]);
    const {isMobile} = useResizeEffects();
    const slidesPerView = 3;
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openViewer = useCallback((images: string[]) => {
        setSelectedImage(images[0]);
        setIsViewerOpen(true);
    }, []);

    const closeViewer = useCallback(() => {
        setSelectedImage(null);
        setIsViewerOpen(false);
    }, []);

    const handleCardClick = useCallback(
        (card: ExampleCardProps) => {
            if (card.images.length > 0) {
                openViewer(card.images);
            }
        },
        [openViewer]
    );
    return (
        <div className={styles.examples__cards}>
            {enableSlider && (
                <SliderComponent
                    slidesPerView={slidesPerView}
                    isMobile={isMobile}>
                    {memoizedExamplesCards.map((card) => (
                        <ExampleCard
                            card={card}
                            onClick={handleCardClick}
                            key={card.id}/>
                    ))}
                </SliderComponent>
            )}
            {!enableSlider && (
                <div className={styles.examples__grid}>
                    {memoizedExamplesCards.map((card) => (
                        <ExampleCard
                            card={card}
                            onClick={handleCardClick}
                            key={card.id}/>
                    ))}
                </div>
            )}
            {isViewerOpen && selectedImage !== null && (
                <PhotoViewer
                    images={cards.find((card) => card.images.includes(selectedImage))?.images ?? []}
                    currentImage={selectedImage}
                    onClose={closeViewer}
                />
            )}
        </div>
    );
};
export default ExamplesCards; 
