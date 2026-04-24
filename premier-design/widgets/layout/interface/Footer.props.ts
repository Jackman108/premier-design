import type {NewsProps} from '@features/news';
import type {Paper} from '@features/papers';
import {MenuItem} from "@shared/ui/menu/interface/Menu.props";

export interface FooterProps {
    papers: Paper[];
    news: NewsProps[];
    menu: MenuItem[];
    /** `false` на странице `/about`: не дублировать открытие новости по `#news-N` с основным блоком. */
    newsHashSyncOnMount?: boolean;
}
