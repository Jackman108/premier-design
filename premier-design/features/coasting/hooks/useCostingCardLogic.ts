import {KeyboardEvent, useEffect, useState} from 'react';
import {useModalState} from "@shared/hooks/useModalState";
import {CostingCardProps} from "@features/coasting/interface/Costing.props";


export const useCostingCardLogic = (cards: CostingCardProps[]) => {
    const {isOpen: isModalOpen, openModal, closeModal} = useModalState(false);
    const [selectedCard, setSelectedCard] = useState<CostingCardProps | null>(null);

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
    }, [cards, closeModal]);

    return {
        isModalOpen,
        selectedCard,
        handleCardClick,
        handleKeyDown,
        closeModal,
    };
};
