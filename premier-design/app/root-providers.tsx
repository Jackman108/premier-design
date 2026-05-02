'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';

import { LocaleProvider } from '@shared/i18n';
import { createQueryClient } from '@shared/lib/query/react-query-config';
import type { SiteLocale } from '@shared/site-data/site-locale';
import { AppErrorBoundary } from '@shared/ui/error-boundary/AppErrorBoundary';
import { ThemeStoreProvider } from '@shared/store/themeStore';
import { WebVitalsReporter } from '@shared/ui/web-vitals/WebVitalsReporter';

type RootProvidersProps = PropsWithChildren<{
	/** Локаль из RSC (`getCachedSiteLocale`): совпадает с cookie для гидрации (как `initialLocale` во Feb Code). */
	initialSiteLocale: SiteLocale;
}>;

/** Корневые провайдеры для App Router (ранее `pages/_app.tsx`). */
export const RootProviders: FC<RootProvidersProps> = ({ children, initialSiteLocale }) => {
	const [queryClient] = useState(createQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="class" enableColorScheme={false}>
				<ThemeStoreProvider>
					{/* key: после router.refresh() совпадаем с RSC; внутри темы — чтобы не сбрасывать ThemeProvider */}
					<LocaleProvider key={initialSiteLocale} initialLocale={initialSiteLocale}>
						<WebVitalsReporter />
						<AppErrorBoundary>{children}</AppErrorBoundary>
					</LocaleProvider>
				</ThemeStoreProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
