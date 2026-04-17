import {TitleProps} from "@shared/ui/title/interface/Title.props";

export interface ExamplesProps {
    cards: ExampleCardProps[];
    title: TitleProps;
}

export interface ExampleCardComponentProps {
    card: ExampleCardProps;
    onClick: (card: ExampleCardProps) => void;
}

export interface ExampleCardProps {
    id: number;
    background: string;
    address: string;
    deadlines: string;
    /** Диапазон бюджета / сегмент (из контента). */
    budgetRange?: string;
    /** Метрика сдачи / соблюдения сроков. */
    onTimeNote?: string;
    bathroomIcon: string;
    bathroomOption: number;
    areaIcon: string;
    areaOption: number;
    areaSquare: string;
    images: string[];
}