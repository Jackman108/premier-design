import { NewsProps } from "../../interface/interfaceData";

export interface NewsStyleProps {
    newsStyle: 'about' | 'footer' | 'body';
}
export interface NewsComponentProps {
    news: NewsProps[];
    newsStyle: NewsStyleProps['newsStyle'];
}