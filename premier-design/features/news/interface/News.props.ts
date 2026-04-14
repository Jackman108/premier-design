import {TitleProps} from "@shared/ui/title/interface/Title.props";

export interface NewsProps {
    id: number;
    image: string;
    imagePng: string;
    title: string;
    text: string;
    date: string;
}

export interface NewsStyleProps {
    newsStyle: 'about' | 'footer' | 'body';
}

export interface NewsComponentProps {
    title?: TitleProps;
    news: NewsProps[];
    newsStyle: NewsStyleProps['newsStyle'];
}