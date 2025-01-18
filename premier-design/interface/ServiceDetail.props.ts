import {ParsedUrlQuery} from "querystring";
import {Category, PriceItem} from "./Category.props";
import {NewsProps} from "./News.props";
import {Paper} from "./Paper.props";
import {MenuProps} from "./Menu.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";
import {CostingCardProps} from "./Costing.props";

export interface ServiceDetailProps {
    service: PriceItem;
    categoryProps: Category;
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