import {ParsedUrlQuery} from "querystring";
import {Category, PriceItem} from "@features/category/interface/Category.props";
import {NewsProps} from "@features/news/interface/News.props";
import {Paper} from "@features/papers/interface/Paper.props";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";
import {ShareBannerDataProps} from "@features/banner/share/interface/ShareBanner.props";

export interface ServiceDetailProps {
    service: PriceItem;
    categoryProps: Category;
    menuData: MenuItem[];
    papersData: Paper[];
    newsData: NewsProps[];
    costingData: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[];
    sharesData: ShareBannerDataProps[]

}

export interface Params extends ParsedUrlQuery {
    categoryId: string;
    serviceId: string;
}