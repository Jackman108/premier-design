export interface OfferType {
    id: number;
    image: string;
    subTitle: string;
    description: string;
    questions: string[];
    tips: string;
    shortTitle: string;
}

export interface OfferListProps {
    designType: OfferType;
    repairType: OfferType;
    aboutType: OfferType;
}