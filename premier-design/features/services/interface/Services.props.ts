import {TitleProps} from "@shared/ui/title/interface/Title.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {ServiceCardProps} from "./ServiceCard.props";

export interface ServicesProps {
    title: TitleProps;
    buttons: ButtonProps[];
    servicesCard: ServiceCardProps[];
}