import {ParsedUrlQuery} from "querystring";
import {PriceItem} from "./Prices.props";

export interface ServiceDetailProps {
    service: PriceItem;
    categoryDescription: string;
}

export interface Params extends ParsedUrlQuery {
    categoryId: string;
    serviceId: string;
}