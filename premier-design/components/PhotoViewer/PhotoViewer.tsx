import { useState, useCallback, useEffect, useRef } from 'react';
import styles from './PhotoViewer.module.css';
import Image from 'next/image';

interface PhotoViewerProps {
    images: string[];
    currentImage: string;
    onClose: () => void;
}
const PhotoViewer: React.FC<PhotoViewerProps> = ({
    images,
    currentImage,
    onClose
}) => {
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
        (event: React.KeyboardEvent<HTMLDivElement>) => {
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
        (event: React.MouseEvent<HTMLDivElement>) => {
            const { width, left } = event.currentTarget.getBoundingClientRect();
            const mouseX = event.clientX - left;
            if (mouseX < width / 2) {
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
    }, [wrapperRef]);

    return (
        <div
            className={styles.photoViewer}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={handleImageClick}
            ref={wrapperRef}
        >
            <div
                className={styles.overlay}
                onClick={handlePrev}
            />
            <Image
                src={currentIndex >= 0 && currentIndex < images.length ? images[currentIndex] : ''}
                alt="Current Image"
                className={styles.image}
                loading="lazy"
                width={1800}
                height={1080}
            />
            <div
                className={styles.overlay}
                onClick={handleClose}
            />
            <div className={styles.buttonContainer}>
                <button
                    className={styles.buttonPrev}
                    onClick={handlePrev}
                    aria-label="Previous"
                    tabIndex={-1}
                >
                    &lt;
                </button>
                <button
                    className={styles.buttonNext}
                    onClick={handleNext}
                    aria-label="Next"
                    tabIndex={-1}
                >
                    &gt;
                </button>
            </div>
            <button
                className={styles.buttonClose}
                onClick={handleClose}
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
