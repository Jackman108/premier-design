
export interface CollapsibleContainerProps {
    items: { value: string; label: string }[];
    activeItem: string;
    activeLabel: string;
    onItemClick: (type: string) => void;
}