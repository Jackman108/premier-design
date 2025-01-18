import {ReactNode} from 'react';
import {MenuProps} from './Menu.props';
import {NewsProps} from './News.props';
import {Paper} from './Paper.props';
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";
import {CostingCardProps} from "./Costing.props";

export interface LayoutData {
    menu: MenuProps[];
    papers: Paper[];
    news: NewsProps[];
    costingCard: CostingCardProps[];
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