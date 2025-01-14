export interface ApproachCardProps {
    id: number;
    image: string;
    title: string;
    description: string;
}

export interface CostingCardProps {
    id: number;
    title: string;
    image: string;
}

export interface ExampleCardProps {
    id: number;
    background: string;
    address: string;
    deadlines: string;
    bathroomIcon: string;
    bathroomOption: number;
    areaIcon: string;
    areaOption: number;
    areaSquare: string;
    images: string[];
}

export interface ServiceCardProps {
    id?: number;
    text: string;
    image: string;
    href: string;
}

export interface RelatedServiceCardProps {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    image: string;
    canonical: string;
    benefits: string[];
    text: string;
    triggers: string[];
}

export interface ExamplesCardProps {
    card: ExampleCardProps;
    onClick: (card: ExamplesCardProps['card']) => void
}