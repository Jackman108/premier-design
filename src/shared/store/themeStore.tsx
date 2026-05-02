'use client';

import { createContext, useContext, useMemo, useState, type FC, type PropsWithChildren } from 'react';

type ThemeName = 'light' | 'dark';

type ThemeStoreValue = {
	currentTheme: ThemeName;
	setCurrentTheme: (theme: ThemeName) => void;
};

const ThemeStoreContext = createContext<ThemeStoreValue | null>(null);

export const ThemeStoreProvider: FC<PropsWithChildren> = ({ children }) => {
	const [currentTheme, setCurrentTheme] = useState<ThemeName>('light');
	const value = useMemo(() => ({ currentTheme, setCurrentTheme }), [currentTheme]);

	return <ThemeStoreContext.Provider value={value}>{children}</ThemeStoreContext.Provider>;
};

export const useThemeStore = (): ThemeStoreValue => {
	const context = useContext(ThemeStoreContext);
	if (!context) {
		throw new Error('useThemeStore must be used within ThemeStoreProvider');
	}
	return context;
};
