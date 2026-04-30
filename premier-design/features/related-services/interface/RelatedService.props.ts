import { TitleProps } from '@shared/ui/title/interface/Title.props';
import { MenuItem } from '@shared/ui/menu/interface/Menu.props';
import type { ButtonProps } from '@entities/button';
import type { CostingCardProps } from '@entities/costing';
import type { PanelProps } from '@entities/panel';
import { ParsedUrlQuery } from 'querystring';
import type { NewsProps } from '@entities/news';
import type { Paper } from '@entities/document';
import type { ShareBannerDataProps } from '@entities/share-banner';
import type { StructuredDataAggregateRating } from '@entities/review';
import type { AppealSectionData } from '@entities/appeal';

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
