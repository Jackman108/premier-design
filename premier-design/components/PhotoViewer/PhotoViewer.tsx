'use client';
import {FC, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import styles from './PhotoViewer.module.css';
import NextImage from 'next/image';
import {PhotoViewerProps} from "../../interface/PhotoViewer.props";

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
        (event: KeyboardEvent<HTMLDivElement>) => {
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
            const {offsetWidth} = event.currentTarget;
            const mouseX = event.clientX;
            if (mouseX < offsetWidth / 2) {
                handlePrev();
            } else {
                handleNext();
            }
        },
        [handlePrev, handleNext]
    );

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.focus();
        }
    }, []);

    return (
        <div
            className={styles.photoViewer}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseDown={handleImageClick}
            ref={wrapperRef}
        >
            <div
                className={styles.overlay}
                onMouseDown={handlePrev}
            />
            <NextImage
                src={currentIndex >= 0 && currentIndex < images.length ? images[currentIndex] : ''}
                alt="Current Image"
                className={styles.image}
                loading="eager"
                width={1800}
                height={1080}
            />
            <div
                className={styles.overlay}
                onMouseDown={handleClose}
            />
            <div className={styles.buttonContainer}>
                <button
                    className={styles.buttonPrev}
                    onMouseDown={handlePrev}
                    aria-label="Previous"
                    tabIndex={-1}
                >
                    &lt;
                </button>
                <button
                    className={styles.buttonNext}
                    onMouseDown={handleNext}
                    aria-label="Next"
                    tabIndex={-1}
                >
                    &gt;
                </button>
            </div>
            <button
                className={styles.buttonClose}
                onMouseDown={handleClose}
                aria-label="Закрыть окно"
            >
                Close
            </button>
            <div className={styles.imageCounter}>
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    );
};

export default PhotoViewer;
