import {TitleProps} from "./Title.props";
import {ButtonProps} from "./Button.props";
import {ServiceCardProps} from "./Cards.props";

export interface ServicesProps {
    titles: TitleProps[];
    buttons: ButtonProps[];
    servicesCard: ServiceCardProps[];
}