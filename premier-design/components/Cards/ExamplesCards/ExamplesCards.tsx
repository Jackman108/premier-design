import { useState, useCallback, useMemo, FC } from 'react';
import styles from './ExamplesCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useResizeEffects';
import PhotoViewer from '../../PhotoViewer/PhotoViewer';
import NextImage from 'next/image';

const ExamplesCards: FC<{ data: ExampleCardProps[] }> = ({
    data
}): JSX.Element => {
    const memoizedExamplesCards = useMemo(() => data || [], [data]);
    const { isMobile } = useResizeEffects();
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
            <SliderComponent
                slidesPerView={slidesPerView}
                isMobile={isMobile}
            >
                {memoizedExamplesCards.map((card) => (
                    <div
                        className={styles.examples__card}
                        key={card.id}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className={styles.card__background}>
                            <NextImage
                                src={card.background}
                                alt={card.address}
                                width={388}
                                height={312}
                                loading='lazy'
                            />
                        </div>
                        <div className={styles.card__content}>
                            <div className={styles.card__address}>
                                {card.address}
                            </div>
                            <div className={styles.card__deadlines}>
                                {card.deadlines}
                            </div>
                            <div className={styles.card__option}>
                                <div className={styles.card__bathroom}>
                                    <div className={styles.bathroom__icon}>
                                        <NextImage
                                            src={card.bathroomIcon}
                                            alt='bathroom'
                                            width={20}
                                            height={20}
                                            loading='lazy'
                                        />
                                    </div>
                                    <div className={styles.bathroom__option}>
                                        {card.bathroomOption}
                                    </div>
                                </div>
                                <div className={styles.card__area}>
                                    <div className={styles.area__icon}>
                                        <NextImage
                                            src={card.areaIcon}
                                            alt='area'
                                            width={20}
                                            height={20}
                                            loading='lazy'
                                        />
                                    </div>
                                    <div className={styles.area__option}>
                                        {card.areaOption}
                                    </div>
                                    <div className={styles.area__square}>
                                        {card.areaSquare}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </SliderComponent>
            {isViewerOpen && selectedImage !== null && (
                <PhotoViewer
                    images={data.find(card => card.images.includes(selectedImage))?.images ?? []}
                    currentImage={selectedImage}
                    onClose={closeViewer}
                />
            )}
        </div>
    );
};
export default ExamplesCards; 
