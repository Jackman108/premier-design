import NextImage from "next/image";
import footerStyles from "./footerNews.module.css";
import aboutStyles from "./aboutNews.module.css";
import bodyStyles from "./bodyNews.module.css";
import { NewsProps } from "../../pages/[types]/Data";

export interface NewsStyleProps {
    newsStyle: 'about' | 'footer' | 'body';
}
interface NewsComponentProps {
    news: NewsProps[];
    newsStyle: NewsStyleProps['newsStyle'];
}
const getNewsStyles = (newsStyle: NewsStyleProps['newsStyle']) => {
    switch (newsStyle) {
        case 'footer':
            return footerStyles;
        case 'about':
            return aboutStyles;
        default:
            return bodyStyles;
    }
};

const News: React.FC<NewsComponentProps> = ({ news, newsStyle }
): JSX.Element => {
    const stylesToUse = getNewsStyles(newsStyle);
    return (
        <div className={stylesToUse.news}>
            <div className={stylesToUse.news__title}>
                <h2>Новости</h2>
            </div>
            <div className={stylesToUse.news__container}>
                {news.map((item) => (
                    <div className={stylesToUse.news__content} key={item.id}>
                        <div className={stylesToUse.content__image}>
                            <NextImage
                                src={item.imagePng ? item.image : item.imagePng}
                                alt={item.title}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className={stylesToUse.content__wrapper}>
                            <div className={stylesToUse.content__title}>
                                {item.title}
                            </div>
                            <div className={stylesToUse.content__date}>
                                {item.date}
                            </div>
                            <div className={stylesToUse.content__text}>
                            {item.text}
                        </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
