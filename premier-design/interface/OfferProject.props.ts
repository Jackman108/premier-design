import {OrderButtonProps} from "./OrderButton.props";

export interface OfferProjectProps {
    id: number;
    image: string;
    title: string;
    price: string;
    pros: string;
    cons: string;
    prosDescription: string[];
    consDescription: string[];
}

export interface ProjectOfferProps extends OrderButtonProps {
    data: OfferProjectProps[];
}

export interface OfferCardProps {
    offer: OfferProjectProps;
    buttonData: string;
    buttonStyle: 'button-white' | 'button-black' | 'button-panel' | 'button-none';
    isReversed: boolean;
}

export interface DescriptionBlockProps {
    title: string;
    descriptions: string[];
}