import {ReactNode} from 'react';
import {MenuProps} from './Menu.props';
import {NewsProps} from './News.props';
import {Paper} from './Paper.props';

export interface LayoutProps {
    children: ReactNode;
    headerProps: HeaderProps;
    footerProps: FooterProps;
}

export interface HeaderProps {
    menu: MenuProps[];
}

export interface FooterProps {
    papers: Paper[];
    news: NewsProps[];
    menu: MenuProps[];
}