import {ChangeEvent} from "react";
import {CostingCardProps} from "./Costing.props";

export interface CalculatorModalProps {
    onClose: () => void;
    card: CostingCardProps;
    cards: CostingCardProps[];
}

export interface CollapsibleContainerProps {
    items: { value: string; label: string }[];
    activeItem: string;
    activeLabel: string;
    onItemClick: (type: string) => void;
}

export interface CostInputProps {
    inputValue: string;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalTabsProps {
    selectedTab: number;
    handleTabChange: (index: number) => void;
    data: CostingCardProps[];
}