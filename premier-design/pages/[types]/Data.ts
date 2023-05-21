
interface MenuProps {
    id: number;
    title: string;
    ruTitle: string;
}
interface ButtonProps {
    buttonHeader: string;
}
interface NewsProps {
    id: number;
    image: string;
    title: string;
    date: string;
}
interface FeatureProps {
    id: number;
    title: string;
    icon: string;
}
interface TitleProps {
    id?: number;
    title: string;
    description: string;
}
interface ApproachCardProps {
    id: number;
    image: string;
    title: string;
    description: string;
}
interface CostingCardProps {
    id: number;
    title: string;
    image: string;
}
interface ExampleCardProps {
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
interface ServiceCardProps {
    id?: number;
    text: string;
    image: string;
    href: string;
}
interface OfferListProps {
    id: number;
    image: string;
    subTitle: string;
    description: string;
    questions: string[];
    tips: string;
}
interface BannerImagesProps {
    src: string;
    alt: string;
    quality: number;
    width: number,
    height: number
}
interface OfferProject {
    id: number;
    image: string;
    title: string;
    price: string;
    pros: string;
    cons: string;
    prosDescription: string[];
    consDescription: string[];
}
interface DataProps {   
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
