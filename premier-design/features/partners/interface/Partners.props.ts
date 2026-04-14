import {TitleProps} from "@shared/ui/title/interface/Title.props";

export interface PartnersProps {
    id: number;
    src: string;
    srcPng: string;
    alt: string;
    quality: number;
    width: number;
    height: number;
    discounts: string;
}

export interface PartnersSectionProps {
    title: TitleProps;
    partners: PartnersProps[];
}