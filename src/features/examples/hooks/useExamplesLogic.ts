import { useCallback, useMemo, useState } from 'react';
import { ExampleCardProps } from '@features/examples/interface/Examples.props';
import { useModalState } from '@shared/hooks/useModalState';
import { useViewportMobile } from '@shared/hooks/useViewportMobile';

export const useExamplesLogic = (cards: ExampleCardProps[]) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [viewerImages, setViewerImages] = useState<string[]>([]);
	const { isOpen: isViewerOpen, openModal, closeModal } = useModalState(false);
	const { isMobile } = useViewportMobile();
	const slidesPerView = 3;

	const memoizedCards = useMemo(() => cards || [], [cards]);

	const openViewer = useCallback(
		(images: string[]) => {
			setSelectedImage(images[0] ?? null);
			setViewerImages(images);
			openModal();
		},
		[openModal],
	);

	const closeViewer = useCallback(() => {
		setSelectedImage(null);
		setViewerImages([]);
		closeModal();
	}, [closeModal]);

	const handleCardClick = useCallback(
		(card: ExampleCardProps) => {
			if (card.images.length > 0) {
				openViewer(card.images);
			}
		},
		[openViewer],
	);

	return {
		memoizedCards,
		isViewerOpen,
		selectedImage,
		viewerImages,
		slidesPerView,
		isMobile,
		handleCardClick,
		openViewer,
		closeViewer,
	};
};
