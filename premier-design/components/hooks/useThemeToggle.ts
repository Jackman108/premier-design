import { useState } from 'react';
import { useTheme } from 'next-themes';

function useThemeToggle(initialTheme: string = 'light') {
    const { theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(initialTheme);

    function toggleTheme() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setCurrentTheme(newTheme);
    }

    return { currentTheme, toggleTheme };
}

export default useThemeToggle;
