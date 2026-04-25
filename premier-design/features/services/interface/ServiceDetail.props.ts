import {ParsedUrlQuery} from "querystring";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {CostingCardProps} from "@shared/interface/CostingCard.props";
import {PanelProps} from "@shared/interface/Panel.props";
import type {Category, PriceItem} from "@shared/interface/CategoryPrice.props";
import type {NewsProps} from "@shared/interface/NewsItem.props";
import type {Paper} from "@shared/interface/PaperItem.props";
import type {ShareBannerDataProps} from "@shared/interface/ShareBannerData.props";
import type {StructuredDataAggregateRating} from '@shared/interface/seoHead.props';
import type {AppealSectionData} from '@shared/interface/appealSectionData.props';

export interface ServiceDetailProps {
    service: PriceItem;
    categoryProps: Category;
    menuData: MenuItem[];
    papersData: Paper[];
    newsData: NewsProps[];
    costingData: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[];
    sharesData: ShareBannerDataProps[];
	appealSection: AppealSectionData;
    structuredDataRating?: StructuredDataAggregateRating;
}

export interface Params extends ParsedUrlQuery {
    categoryId: string;
    serviceId: string;
}
