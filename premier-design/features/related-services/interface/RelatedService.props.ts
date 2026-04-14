import {TitleProps} from "@shared/ui/title/interface/Title.props";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";
import {Paper} from "@features/papers/interface/Paper.props";
import {NewsProps} from "@features/news/interface/News.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {ParsedUrlQuery} from "querystring";
import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";
import {ShareBannerDataProps} from "@features/banner/share/interface/ShareBanner.props";


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
    titles: TitleProps[];
    relatedService: RelatedServiceCardProps;
    menuData: MenuItem[];
    papersData: Paper[];
    newsData: NewsProps[];
    costingData: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[];
    sharesData: ShareBannerDataProps[]
}

export interface RelatedParams extends ParsedUrlQuery {
    relatedId: string;
}