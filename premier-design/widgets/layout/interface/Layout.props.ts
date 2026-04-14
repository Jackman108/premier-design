import {ReactNode} from 'react';
import {MenuItem} from '@shared/ui/menu/interface/Menu.props';
import {NewsProps} from '@features/news/interface/News.props';
import {Paper} from '@features/papers/interface/Paper.props';
import {ButtonProps} from "@shared/interface/Button.props";
import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";
import {HeaderProps} from "./Header.props";
import {FooterProps} from "./Footer.props";
import {ShareBannerDataProps} from "@features/banner/share/interface/ShareBanner.props";

export interface LayoutData {
    menu: MenuItem[];
    papers: Paper[];
    news: NewsProps[];
    costingCard: CostingCardProps[];
    button: ButtonProps[];
    panel: PanelProps[];
    shares: ShareBannerDataProps[];

}

export interface LayoutProps {
    children: ReactNode;
    headerProps: HeaderProps;
    footerProps: FooterProps;
    additionalData: {
        costingCards: CostingCardProps[];
        buttonData: ButtonProps[];
        panelData: PanelProps[];
    };
}


