/** @jest-environment jsdom */
import {renderHook} from '@testing-library/react';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';

const emptyLayoutData = () => ({
    menu: [],
    papers: [],
    news: [],
    costingCard: [],
    button: [],
    panel: [],
    shares: [],
});

describe('useLayoutProps', () => {
    it('maps layout data into header, footer and additionalData', () => {
        const data = emptyLayoutData();
        const {result} = renderHook(() => useLayoutProps(data));

        expect(result.current.headerProps).toEqual({menu: data.menu, shares: data.shares});
        expect(result.current.footerProps).toEqual({
            papers: data.papers,
            news: data.news,
            menu: data.menu,
        });
        expect(result.current.additionalData).toEqual({
            costingCards: data.costingCard,
            buttonData: data.button,
            panelData: data.panel,
        });
    });

    it('memoizes by data reference', () => {
        const data = emptyLayoutData();
        const {result, rerender} = renderHook((d) => useLayoutProps(d), {initialProps: data});
        const first = result.current;
        rerender(data);
        expect(result.current).toBe(first);
    });
});
