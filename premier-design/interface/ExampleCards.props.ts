import { ExampleCardProps, GetDataProps } from "./interfaceData";

export interface PageProps extends GetDataProps {
    enableSlider?: boolean;
}

export interface ExampleCardsProps {
    data: ExampleCardProps[];
    enableSlider?: boolean;
}

export interface ExamplesCardProps {
    card: ExampleCardProps;
    onClick: (card: ExamplesCardProps['card']) => void
}