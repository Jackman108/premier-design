import {ParsedUrlQuery} from "querystring";
import {PriceItem} from "./Prices.props";
import {NewsProps} from "./News.props";
import {Paper} from "./Paper.props";
import {MenuProps} from "./Menu.props";
import {CostingCardProps} from "./Cards.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";

export interface ServiceDetailProps {
    service: PriceItem;
    categoryDescription: string;
    menuData: MenuProps[];
    papersData: Paper[];
    newsData: NewsProps[];
    costingData: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[];
}

export interface Params extends ParsedUrlQuery {
    categoryId: string;
    serviceId: string;
}