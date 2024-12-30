import {TitleProps} from "./Title.props";
import {ExampleCardProps} from "./Cards.props";

export interface ExamplesProps {
    cards: ExampleCardProps[];
    titles: TitleProps[];
    enableSlider?: boolean;
}

export interface ExamplesCardsProps {
    cards: ExampleCardProps[];
    enableSlider?: boolean;
}