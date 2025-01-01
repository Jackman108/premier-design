import {ParsedUrlQuery} from "querystring";
import {PriceItem} from "./Prices.props";
import {NewsProps} from "./News.props";
import {Paper} from "./Paper.props";
import {MenuProps} from "./Menu.props";

export interface ServiceDetailProps {
    service: PriceItem;
    categoryDescription: string;
    menuData: MenuProps[];
    papersData: Paper[];
    newsData: NewsProps[];
}

export interface Params extends ParsedUrlQuery {
    categoryId: string;
    serviceId: string;
}