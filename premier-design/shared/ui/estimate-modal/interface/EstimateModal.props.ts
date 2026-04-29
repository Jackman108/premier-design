import {type ChangeEvent} from 'react';
import type { CostingCardProps } from '@entities/costing';
export interface EstimateModalProps {
    onClose: () => void;
    card: CostingCardProps;
    cards: CostingCardProps[];
}

export interface CollapsibleContainerProps {
    items: { value: string; label: string }[];
    activeItem: string;
    activeLabel: string;
    onItemClick: (type: string) => void;
    /**
     * Имя группы для вспомогательного текста a11y (не перекрывает выбранную подпись, только `visually hidden` префикс).
     */
    groupLabel?: string;
}

export interface CostInputProps {
    inputValue: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
