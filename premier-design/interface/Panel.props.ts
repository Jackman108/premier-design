export interface PanelProps {
    id: string;
    onClick?: () => void;
    icon: string;
    altText: string;
    text: string;
    position: { bottom: string };
}