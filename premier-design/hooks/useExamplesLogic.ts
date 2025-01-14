import {useCallback, useMemo, useState} from 'react';
import {ExampleCardProps} from '../interface/Examples.props';
import {useModalState} from './useModalState';
import useResizeEffects from './useResizeEffects';

export const useExamplesLogic = (cards: ExampleCardProps[]) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {isOpen: isViewerOpen, openModal, closeModal} = useModalState(false);
    const {isMobile} = useResizeEffects();
    const slidesPerView = 3;

    const memoizedCards = useMemo(() => cards || [], [cards]);

    const openViewer = useCallback((images: string[]) => {
        setSelectedImage(images[0]);
        openModal();
    }, [openModal]);

    const closeViewer = useCallback(() => {
        setSelectedImage(null);
        closeModal();
    }, [closeModal]);

    const handleCardClick = useCallback(
        (card: ExampleCardProps) => {
            if (card.images.length > 0) {
                openViewer(card.images);
            }
        },
        [openViewer]
    );

    return {
        memoizedCards,
        isViewerOpen,
        selectedImage,
        slidesPerView,
        isMobile,
        handleCardClick,
        openViewer,
        closeViewer
    };
};
