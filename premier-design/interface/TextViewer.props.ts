export interface TextViewerProps {
    title: string;
    text: string;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    image: string;
}
