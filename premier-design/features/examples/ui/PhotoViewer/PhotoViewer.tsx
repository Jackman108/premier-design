'use client';
import {FC, KeyboardEvent, MouseEvent, useCallback, useEffect, useState} from 'react';
import styles from './PhotoViewer.module.css';
import NextImage from 'next/image';
import {PhotoViewerProps} from "@features/examples/interface/PhotoViewer.props";

const PhotoViewer: FC<PhotoViewerProps> = ({
                                               images,
                                               currentImage,
                                               onClose
                                           }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(
        images.indexOf(currentImage)
    );

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
        [handlePrev, handleNext, handleClose]
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
        [handlePrev, handleNext]
    );

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
