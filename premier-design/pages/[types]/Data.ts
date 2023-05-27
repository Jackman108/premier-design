
export interface MenuProps {
    id: number;
    title: string;
    ruTitle: string;
}
export interface ButtonProps {
    buttonHeader: string;
}
export interface NewsProps {
    id: number;
    image: string;
    imagePng: string;
    title: string;
    text: string;
    date: string;
}
export interface FeatureProps {
    id: number;
    title: string;
    iconPng: string;
    icon: string;
}
export interface TitleProps {
    id?: number;
    title: string;
    description: string;
}
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
export interface OfferListProps {
    id: number;
    image: string;
    subTitle: string;
    description: string;
    questions: string[];
    tips: string;
}
export interface BannerImagesProps {
    src: string;
    alt: string;
    quality: number;
    width: number,
    height: number
}
export interface OfferProject {
    id: number;
    image: string;
    title: string;
    price: string;
    pros: string;
    cons: string;
    prosDescription: string[];
    consDescription: string[];
}
export interface DataProps {
    menu: MenuProps[];
    button: ButtonProps[];
    news: NewsProps[];
    features: FeatureProps[];
    title: TitleProps[];
    cards: {
        approachCard: ApproachCardProps[];
        costingCard: CostingCardProps[];
        examplesCard: ExampleCardProps[];
        servicesCard: ServiceCardProps[];
    };
    offerList: OfferListProps[];
    offerProject: {
        designType: OfferProject[];
        repairType: OfferProject[];
    }
    bannersImages: BannerImagesProps[];
}
export interface GetDataProps {
    data: DataProps;
}