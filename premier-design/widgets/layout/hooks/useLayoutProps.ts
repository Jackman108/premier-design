import {useMemo} from 'react';
import {LayoutData} from "../interface/Layout.props";

export const useLayoutProps = (data: LayoutData) => {
    return useMemo(() => ({
        headerProps: {
            menu: data.menu,
            shares: data.shares,
        },
        footerProps: {
            papers: data.papers,
            news: data.news,
            menu: data.menu,
        },
        additionalData: {
            costingCards: data.costingCard,
            buttonData: data.button,
            panelData: data.panel,
        },
    }), [data]);
};
