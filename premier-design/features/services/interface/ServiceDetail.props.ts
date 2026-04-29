import {ParsedUrlQuery} from "querystring";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import type { ButtonProps } from '@entities/button';
import type { CostingCardProps } from '@entities/costing';
import type { PanelProps } from '@entities/panel';
import type { Category, PriceItem } from '@entities/service';
import type { NewsProps } from '@entities/news';
import type { Paper } from '@entities/document';
import type { ShareBannerDataProps } from '@entities/share-banner';
import type { StructuredDataAggregateRating } from '@entities/review';
import type { AppealSectionData } from '@entities/appeal';

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
