/** @jest-environment jsdom */
import {renderHook} from '@testing-library/react';
import {usePageData} from '@shared/hooks/usePageData';

describe('usePageData', () => {
    it('resolves title, button and banner by shortTitle', () => {
        const titles = [{shortTitle: 'page', canonical: '/path'}];
        const buttons = [{shortTitle: 'cta'}];
        const banners = [{shortTitle: 'hero'}];

        const {result} = renderHook(() =>
            usePageData(titles, buttons, banners, 'page', 'cta', 'hero'),
        );

        expect(result.current.titleItem.shortTitle).toBe('page');
        expect(result.current.titleItem.canonical).toBe('https://premium-interior.by/path');
        expect(result.current.buttonItem).toEqual({shortTitle: 'cta'});
        expect(result.current.bannerItem).toEqual({shortTitle: 'hero'});
    });

    it('uses empty objects when items are missing', () => {
        const {result} = renderHook(() => usePageData([], [], [], 'x', 'y', 'z'));

        expect(result.current.titleItem).toEqual({canonical: ''});
        expect(result.current.buttonItem).toEqual({});
        expect(result.current.bannerItem).toEqual({});
    });

    it('leaves canonical empty when title has no canonical field', () => {
        const titles = [{shortTitle: 'only'}];
        const {result} = renderHook(() =>
            usePageData(titles, [], [], 'only', 'b', 'c'),
        );

        expect(result.current.titleItem.canonical).toBe('');
    });
});
