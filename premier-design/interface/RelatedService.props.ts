import {TitleProps} from "./Title.props";
import {MenuProps} from "./Menu.props";
import {Paper} from "./Paper.props";
import {NewsProps} from "./News.props";
import {CostingCardProps} from "./Cards.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";
import {ParsedUrlQuery} from "querystring";

export interface RelatedService {
    id: string;
    title: string;
    description: string;
    image: string;
    canonical: string;
}

export interface RelatedServicesProps {
    titles: TitleProps[];
    relatedServices: RelatedService[];
}

export interface RelatedServiceDetail {
    titles: TitleProps[];
    relatedServices: RelatedService;
    menuData: MenuProps[];
    papersData: Paper[];
    newsData: NewsProps[];
    costingData: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[];
}


export interface RelatedParams extends ParsedUrlQuery {
    relatedId: string;
}