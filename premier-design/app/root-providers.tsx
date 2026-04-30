'use client';

import { ThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

import { AppErrorBoundary } from '@shared/ui/error-boundary/AppErrorBoundary';
import { ThemeStoreProvider } from '@shared/store/themeStore';

/** Корневые провайдеры для App Router (ранее `pages/_app.tsx`). */
export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
	<ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="class" enableColorScheme={false}>
		<ThemeStoreProvider>
			<AppErrorBoundary>{children}</AppErrorBoundary>
		</ThemeStoreProvider>
	</ThemeProvider>
);
