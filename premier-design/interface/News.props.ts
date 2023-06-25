import { NewsProps } from "./interfaceData";

export interface NewsStyleProps {
    newsStyle: 'about' | 'footer' | 'body';
}
export interface NewsComponentProps {
    news: NewsProps[];
    newsStyle: NewsStyleProps['newsStyle'];
}