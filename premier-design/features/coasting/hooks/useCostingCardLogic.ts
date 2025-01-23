import {KeyboardEvent, useEffect, useMemo, useState} from 'react';
import {useModalState} from "@shared/hooks/useModalState";
import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import useResizeEffects from "@shared/hooks/useResizeEffects";

export const useCostingCardLogic = (cards: CostingCardProps[]) => {
    const {isOpen: isModalOpen, openModal, closeModal} = useModalState(false);
    const [selectedCard, setSelectedCard] = useState<CostingCardProps | null>(null);
    const {isMobile} = useResizeEffects();

    const memoizedCards = useMemo(() => cards || [], [cards]);
    const slidesPerView = 3;

    const handleCardClick = (card: CostingCardProps) => {
        setSelectedCard(card);
        openModal();
    };

    const handleKeyDown = (event: KeyboardEvent, card: CostingCardProps) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(card);
        }
    };

    useEffect(() => {
        closeModal();
        setSelectedCard(null);
    }, [memoizedCards, closeModal]);

    return {
        isMobile,
        isModalOpen,
        selectedCard,
        handleCardClick,
        handleKeyDown,
        closeModal,
        memoizedCards,
        slidesPerView
    };
};
