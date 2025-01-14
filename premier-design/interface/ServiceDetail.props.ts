import {ParsedUrlQuery} from "querystring";
import {PriceItem} from "./Prices.props";
import {NewsProps} from "./News.props";
import {Paper} from "./Paper.props";
import {MenuProps} from "./Menu.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";
import {CostingCardProps} from "./Costing.props";

export interface ServiceDetailProps {
    service: PriceItem;
    categoryProps: categoryDetailProps;
    menuData: MenuProps[];
    papersData: Paper[];
    newsData: NewsProps[];
    costingData: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[];
}

export interface categoryDetailProps {
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
        quality: number;
        width: number;
        height: number;
    };
}

export interface Params extends ParsedUrlQuery {
    categoryId: string;
    serviceId: string;
}