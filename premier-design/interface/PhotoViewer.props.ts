export interface PhotoViewerProps {
    images: string[];
    currentImage: string;
    onClose: () => void;
}