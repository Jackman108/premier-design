'use client';

import { FC, useId, useRef } from 'react';
import styles from './PhotoViewer.module.css';
import NextImage from 'next/image';
import { PhotoViewerProps } from '@features/examples/interface/PhotoViewer.props';
import { usePhotoViewer } from '@features/examples/hooks/usePhotoViewer';
import { usePhotoViewerDialog } from '@features/examples/hooks/usePhotoViewerDialog';

const PhotoViewer: FC<PhotoViewerProps> = ({ images, currentImage, onClose }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const descriptionId = useId();
	const { currentIndex, handleClose, handleImageClick, handleKeyDown, handleNext, handlePrev } = usePhotoViewer({
		images,
		currentImage,
		onClose,
	});

	usePhotoViewerDialog(dialogRef);

	const src = currentIndex >= 0 && currentIndex < images.length ? images[currentIndex] : '';
	const slideLabel =
		images.length > 0
			? `Фото ${currentIndex + 1} из ${images.length}, полноэкранный просмотр`
			: 'Просмотр изображения';

	return (
		<dialog
			ref={dialogRef}
			className={styles.photoViewer}
			tabIndex={-1}
			onKeyDown={handleKeyDown}
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
		>
			<h2 id={titleId} className={styles.visuallyHidden}>
				Просмотр примеров работ
			</h2>
			<p id={descriptionId} className={styles.visuallyHidden}>
				Полноэкранный просмотр фотографий объекта. Стрелки или клик по левой и правой части кадра — предыдущее и
				следующее фото. Escape или клик по затемнению — закрыть.
			</p>
			<button type="button" className={styles.overlayScrim} aria-label="Закрыть просмотр" onClick={handleClose} />
			<div className={styles.contentRoot}>
				<div className={styles.stage}>
					<div className={styles.imageHit} onMouseDown={handleImageClick} role="presentation">
						{src ? (
							<NextImage
								src={src}
								alt={slideLabel}
								className={styles.image}
								loading="eager"
								width={1800}
								height={1080}
								sizes="90vw"
								style={{ width: 'auto', height: 'auto' }}
							/>
						) : null}
					</div>
					<div className={styles.buttonContainer}>
						<button
							className={styles.buttonPrev}
							onClick={handlePrev}
							aria-label="Предыдущее изображение"
							type="button"
						>
							&lt;
						</button>
						<button
							className={styles.buttonNext}
							onClick={handleNext}
							aria-label="Следующее изображение"
							type="button"
						>
							&gt;
						</button>
					</div>
				</div>
				<button className={styles.buttonClose} onClick={handleClose} aria-label="Закрыть окно" type="button">
					Close
				</button>
				<div className={styles.imageCounter}>
					{currentIndex + 1} / {images.length}
				</div>
			</div>
		</dialog>
	);
};

export default PhotoViewer;
