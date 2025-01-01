import {FooterProps} from '../interface/Layout.props';

export const useLayoutProps = (data: FooterProps) => ({
    headerProps: {
        menu: data.menu,
    },
    footerProps: {
        papers: data.papers,
        news: data.news,
        menu: data.menu,
    },
});