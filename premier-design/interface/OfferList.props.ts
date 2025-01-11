export interface OfferType {
    id: number;
    image: string;
    title: string;
    description: string;
    questions: string[];
    tips: string;
    shortTitle: string;
}

export interface OfferListProps {
    designType: OfferType;
    repairType: OfferType;
    aboutType: OfferType;
    homeType: OfferType;
}