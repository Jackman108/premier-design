import {TitleProps} from "./Title.props";
import {ButtonProps} from "./Button.props";
import {ServiceCardProps} from "./Cards.props";

export interface ServicesProps {
    titles: TitleProps[];
    buttons: ButtonProps[];
    servicesCard: ServiceCardProps[];
}

export interface RelatedService {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
}

export interface RelatedServicesProps {
    titles: TitleProps[];
    relatedServices: RelatedService[];
}