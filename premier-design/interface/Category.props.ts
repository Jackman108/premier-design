import {TitleProps} from "./Title.props";
import {ButtonProps} from "./Button.props";

export interface PriceItem {
    service: string;
    unit: string;
    price: string;
    canonical: string;
}

export interface Category {
    id: string;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
        quality: number;
        width: number;
        height: number;
    };
    priceList: PriceItem[];
}

export interface Prices {
    repairs: Category[];
    design: Category[];
}

export interface CategoryProps {
    titles: TitleProps[];
    repairs: Category[];
    buttonData: ButtonProps[];
}