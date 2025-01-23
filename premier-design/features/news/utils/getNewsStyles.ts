import {NewsStyleProps} from "@features/news/interface/News.props";
import footerStyles from "@features/news/ui/News/footerNews.module.css";
import aboutStyles from "@features/news/ui/News/aboutNews.module.css";
import bodyStyles from "@features/news/ui/News/bodyNews.module.css";

export const getNewsStyles = (newsStyle: NewsStyleProps['newsStyle']) => {
    switch (newsStyle) {
        case 'footer':
            return footerStyles;
        case 'about':
            return aboutStyles;
        default:
            return bodyStyles;
    }
};