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
    news: NewsProps[];
    newsStyle: NewsStyleProps['newsStyle'];
}