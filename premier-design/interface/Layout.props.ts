import {ReactNode} from 'react';
import {MenuProps} from './Menu.props';
import {NewsProps} from './News.props';
import {Paper} from './Paper.props';
import {CostingCardProps} from "./Cards.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";

export interface LayoutData {
    menu: MenuProps[];
    papers: Paper[];
    news: NewsProps[];
    cards: {
        costingCard: CostingCardProps[];
    };
    button: ButtonProps[];
    panel: PanelProps[];
}

export interface LayoutProps {
    children: ReactNode;
    headerProps: HeaderProps;
    footerProps: FooterProps;
    costingCards: CostingCardProps[];
    buttonData: ButtonProps[];
    panelData: PanelProps[]
}

export interface HeaderProps {
    menu: MenuProps[];
}

export interface FooterProps {
    papers: Paper[];
    news: NewsProps[];
    menu: MenuProps[];
}