'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';

import { createQueryClient } from '@shared/lib/query/react-query-config';
import { AppErrorBoundary } from '@shared/ui/error-boundary/AppErrorBoundary';
import { ThemeStoreProvider } from '@shared/store/themeStore';
import { WebVitalsReporter } from '@shared/ui/web-vitals/WebVitalsReporter';

/** Корневые провайдеры для App Router (ранее `pages/_app.tsx`). */
export const RootProviders: FC<PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(createQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="class" enableColorScheme={false}>
				<ThemeStoreProvider>
					<WebVitalsReporter />
					<AppErrorBoundary>{children}</AppErrorBoundary>
				</ThemeStoreProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
