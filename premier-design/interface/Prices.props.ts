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
    priceList: PriceItem[];
}

export interface Prices {
    repairs: Category[];
    design: Category[];
}