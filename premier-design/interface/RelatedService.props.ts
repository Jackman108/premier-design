import {TitleProps} from "./Title.props";
import {MenuProps} from "./Menu.props";
import {Paper} from "./Paper.props";
import {NewsProps} from "./News.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";
import {ParsedUrlQuery} from "querystring";
import {CostingCardProps} from "./Costing.props";


export interface RelatedServiceCardProps {
    id: string;
    title: string;
    subTitle: string;
    description: string;
    image: string;
    canonical: string;
    benefits: string[];
    text: string;
    triggers: string[];
}

export interface RelatedServicesProps {
    titles: TitleProps[];
    relatedServices: RelatedServiceCardProps[];
}

export interface RelatedServiceDetail {
    titles: TitleProps[];
    relatedServices: RelatedServiceCardProps;
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