import { useState } from 'react';
import { useTheme } from 'next-themes';
import { ThemeButtonProps } from '../Menu/MenuData.props';

function useThemeToggle(initialTheme: string = 'light'): ThemeButtonProps {
    const { setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(initialTheme);

    function toggleTheme(): void {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setCurrentTheme(newTheme);
    }

    return { currentTheme, toggleTheme };
}

export default useThemeToggle;
