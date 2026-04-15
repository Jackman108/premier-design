/** @jest-environment jsdom */
import {act, renderHook} from '@testing-library/react';
import useThemeToggle from '@widgets/layout/hooks/useThemeToggle';

const setTheme = jest.fn();

jest.mock('next-themes', () => ({
    useTheme: () => ({setTheme, themes: ['light', 'dark']}),
}));

describe('useThemeToggle', () => {
    beforeEach(() => {
        setTheme.mockClear();
    });

    it('uses initial theme', () => {
        const {result} = renderHook(() => useThemeToggle('light'));
        expect(result.current.currentTheme).toBe('light');
    });

    it('toggles theme and calls setTheme', () => {
        const {result} = renderHook(() => useThemeToggle('light'));

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
