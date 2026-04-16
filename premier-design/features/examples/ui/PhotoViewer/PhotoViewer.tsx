'use client';
import {FC} from 'react';
import styles from './PhotoViewer.module.css';
import NextImage from 'next/image';
import {PhotoViewerProps} from "@features/examples/interface/PhotoViewer.props";
import {usePhotoViewer} from '@features/examples/hooks/usePhotoViewer';

const PhotoViewer: FC<PhotoViewerProps> = ({
                                               images,
                                               currentImage,
                                               onClose
                                           }) => {
    const {currentIndex, handleClose, handleImageClick, handleKeyDown, handleNext, handlePrev} = usePhotoViewer({
        images,
        currentImage,
        onClose,
    });

    return (
        <dialog
            className={styles.photoViewer}
            open
            onKeyDown={handleKeyDown}
            onCancel={handleClose}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    handleClose();
                }
            }}
            aria-label="Просмотр изображений"
        >
            <div className={styles.stage} onMouseDown={handleImageClick}>
                <NextImage
                    src={currentIndex >= 0 && currentIndex < images.length ? images[currentIndex] : ''}
                    alt="Current Image"
                    className={styles.image}
                    loading="eager"
                    width={1800}
                    height={1080}
                />
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.buttonPrev}
                        onClick={handlePrev}
                        aria-label="Previous"
                        type="button"
                    >
                        &lt;
                    </button>
                    <button
                        className={styles.buttonNext}
                        onClick={handleNext}
                        aria-label="Next"
                        type="button"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <button
                className={styles.buttonClose}
                onClick={handleClose}
                aria-label="Закрыть окно"
                type="button"
            >
                Close
            </button>
            <div className={styles.imageCounter}>
                {currentIndex + 1} / {images.length}
            </div>
        </dialog>
    );
};

export default PhotoViewer;
