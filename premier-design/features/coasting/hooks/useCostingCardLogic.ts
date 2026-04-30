import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useModalState } from '@shared/hooks/useModalState';
import { CostingCardProps } from '@features/coasting/interface/Costing.props';
import { useViewportMobile } from '@shared/hooks/useViewportMobile';

export const useCostingCardLogic = (cards: CostingCardProps[]) => {
	const { isOpen: isModalOpen, openModal, closeModal } = useModalState(false);
	const [selectedCard, setSelectedCard] = useState<CostingCardProps | null>(null);
	const { isMobile } = useViewportMobile();

	const memoizedCards = useMemo(() => cards || [], [cards]);
	/** Стабильный по содержимому ключ: родитель часто передаёт новый [] с теми же карточками. */
	const cardsIdentityKey = (cards ?? []).map((c) => String(c.id)).join('|');
	const prevCardsIdentityKey = useRef<string | null>(null);
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
		const prev = prevCardsIdentityKey.current;
		prevCardsIdentityKey.current = cardsIdentityKey;
		if (prev === null || prev === cardsIdentityKey) {
			return;
		}
		queueMicrotask(() => {
			closeModal();
			setSelectedCard(null);
		});
	}, [cardsIdentityKey, closeModal]);

	return {
		isMobile,
		isModalOpen,
		selectedCard,
		handleCardClick,
		handleKeyDown,
		closeModal,
		memoizedCards,
		slidesPerView,
	};
};
