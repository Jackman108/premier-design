/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import type {FC, PropsWithChildren} from 'react';
import {createElement} from 'react';
import useThemeToggle from '@widgets/layout/hooks/useThemeToggle';
import {ThemeStoreProvider} from '@shared/store/themeStore';

const setTheme = jest.fn();

jest.mock('next-themes', () => ({
    useTheme: () => ({setTheme, themes: ['light', 'dark']}),
}));

describe('useThemeToggle', () => {
    const wrapper: FC<PropsWithChildren> = ({children}) => createElement(ThemeStoreProvider, null, children);

    beforeEach(() => {
        setTheme.mockClear();
    });

    it('uses initial theme', () => {
        const {result} = renderHook(() => useThemeToggle('light'), {wrapper});
        expect(result.current.currentTheme).toBe('light');
    });

    it('toggles theme and calls setTheme', () => {
        const {result} = renderHook(() => useThemeToggle('light'), {wrapper});

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.currentTheme).toBe('dark');
        expect(setTheme).toHaveBeenCalledWith('dark');

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.currentTheme).toBe('light');
        expect(setTheme).toHaveBeenCalledWith('light');
    });
});
