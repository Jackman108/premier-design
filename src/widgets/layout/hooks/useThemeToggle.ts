import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeButtonProps } from '../interface/ThemeButton.props';
import { useThemeStore } from '@shared/store/themeStore';

function useThemeToggle(initialTheme = 'light'): ThemeButtonProps {
	const { setTheme, resolvedTheme } = useTheme();
	const { currentTheme, setCurrentTheme } = useThemeStore();

	useEffect(() => {
		if (resolvedTheme === 'light' || resolvedTheme === 'dark') {
			setCurrentTheme(resolvedTheme);
		} else if (!resolvedTheme && (initialTheme === 'light' || initialTheme === 'dark')) {
			setCurrentTheme(initialTheme);
		}
	}, [resolvedTheme, setCurrentTheme, initialTheme]);

	function toggleTheme(): void {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		setCurrentTheme(newTheme);
	}

	return { currentTheme, toggleTheme };
}

export default useThemeToggle;
