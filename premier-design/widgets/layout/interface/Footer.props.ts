import {Paper} from "@features/papers/interface/Paper.props";
import {NewsProps} from "@features/news/interface/News.props";
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";

export interface FooterProps {
    papers: Paper[];
    news: NewsProps[];
    menu: MenuItem[];
    /** `false` на странице `/about`: не дублировать открытие новости по `#news-N` с основным блоком. */
    newsHashSyncOnMount?: boolean;
}
