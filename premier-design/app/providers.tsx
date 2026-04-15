'use client';

import {ThemeProvider} from 'next-themes';
import type {FC, PropsWithChildren} from 'react';
import {ThemeStoreProvider} from '@shared/store/themeStore';

export const Providers: FC<PropsWithChildren> = ({children}) => {
	return (
		<ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="class">
			<ThemeStoreProvider>{children}</ThemeStoreProvider>
		</ThemeProvider>
	);
};
