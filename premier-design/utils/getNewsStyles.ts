import {NewsStyleProps} from "../interface/News.props";
import footerStyles from "../components/News/footerNews.module.css";
import aboutStyles from "../components/News/aboutNews.module.css";
import bodyStyles from "../components/News/bodyNews.module.css";

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