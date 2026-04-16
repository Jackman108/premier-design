import {KeyboardEvent, MouseEvent, useCallback, useEffect, useState} from 'react';

type UsePhotoViewerParams = {
	images: string[];
	currentImage: string;
	onClose: () => void;
};

// Управляет всем интерактивом просмотрщика (клавиатура/клики/переходы),
// чтобы UI-компонент оставался только декларативным слоем рендера.
export const usePhotoViewer = ({images, currentImage, onClose}: UsePhotoViewerParams) => {
	const [currentIndex, setCurrentIndex] = useState<number>(images.indexOf(currentImage));

	useEffect(() => {
		setCurrentIndex(images.indexOf(currentImage));
	}, [images, currentImage]);

	const handleNext = useCallback(() => {
		if (images.length > 1) {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}
	}, [images]);

	const handlePrev = useCallback(() => {
		if (images.length > 1) {
			setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
		}
	}, [images]);

	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDialogElement>) => {
			// Поддерживаем привычные gallery-shortcuts и Escape для доступности.
			switch (event.key) {
				case 'ArrowLeft':
					handlePrev();
					break;
				case 'ArrowRight':
					handleNext();
					break;
				case 'Escape':
					handleClose();
					break;
				case ' ':
					if (!event.shiftKey) {
						event.preventDefault();
						handleNext();
					}
					break;
				default:
					break;
			}
		},
		[handlePrev, handleNext, handleClose],
	);

	const handleImageClick = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const bounds = event.currentTarget.getBoundingClientRect();
			const mouseX = event.clientX - bounds.left;
			if (mouseX < bounds.width / 2) {
				handlePrev();
			} else {
				handleNext();
			}
		},
		[handlePrev, handleNext],
	);

	return {
		currentIndex,
		handleClose,
		handleImageClick,
		handleKeyDown,
		handleNext,
		handlePrev,
	};
};
