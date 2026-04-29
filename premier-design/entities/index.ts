/**
 * @entities — публичный API слоя entities (FSD: доменные модели).
 * PD-R-05: симметрия с febcode (`src/entities`).
 */

export type { Category, PriceItem } from './service';
export type { Paper } from './document';
export type { StructuredDataAggregateRating } from './review';
export type { BannerImageProps } from './banner';
export type { ButtonProps } from './button';
export type { TitleProps } from './title';
export type { NewsProps } from './news';
export type { CostingCardProps } from './costing';
export type { PanelProps } from './panel';
export type { ShareBannerDataProps } from './share-banner';
export type { AppealSectionData } from './appeal';
export type { FaqStructuredDataItem, ServiceJsonLdInput } from './seo';
