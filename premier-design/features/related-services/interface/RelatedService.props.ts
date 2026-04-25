import {TitleProps} from "@shared/ui/title/interface/Title.props";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {CostingCardProps} from "@shared/interface/CostingCard.props";
import {PanelProps} from "@shared/interface/Panel.props";
import {ParsedUrlQuery} from "querystring";
import type {NewsProps} from "@shared/interface/NewsItem.props";
import type {Paper} from "@shared/interface/PaperItem.props";
import type {ShareBannerDataProps} from "@shared/interface/ShareBannerData.props";
import type {StructuredDataAggregateRating} from '@shared/interface/seoHead.props';
import type {AppealSectionData} from '@shared/interface/appealSectionData.props';

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
    title: TitleProps;
    relatedServices: RelatedServiceCardProps[];
}

export interface RelatedServiceDetailProps {
    relatedService: RelatedServiceCardProps;
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

export interface RelatedParams extends ParsedUrlQuery {
    relatedId: string;
}
