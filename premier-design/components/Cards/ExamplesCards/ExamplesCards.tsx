import { useState, useCallback } from 'react';
import styles from './ExamplesCards.module.css';
import SliderComponent from '../../Slider/Slider';
import useResizeEffects from '../../hooks/useResizeEffects';
import PhotoViewer from '../../PhotoViewer/PhotoViewer';

const ExamplesCards: React.FC<{ data: ExampleCardProps[] }> = ({ data }): JSX.Element => {
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


    return (
        <div className={styles.examples__cards}>
            <SliderComponent
                slidesPerView={slidesPerView}
                isMobile={isMobile}
            >
                {data.map((card) => (
                    <div
                        className={styles.examples__card}
                        key={card.id}
                        onClick={() => card.images.length > 0 && openViewer([...card.images])}
                    >
                        <div className={styles.card__background}>
                            <img src={card.background} alt={card.address} />
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
                                        <img src={card.bathroomIcon} alt='bathroom' />
                                    </div>
                                    <div className={styles.bathroom__option}>
                                        {card.bathroomOption}
                                    </div>
                                </div>
                                <div className={styles.card__area}>
                                    <div className={styles.area__icon}>
                                        <img src={card.areaIcon} alt='bathroom' />
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
