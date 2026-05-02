import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import { SITE_OPERATOR } from '@shared/constants/company';
import { inter, playfair } from '@shared/lib/interFont';
import { getCachedSiteLocale } from '@shared/lib/getStaticData';
import { hreflangAlternatesForPath, pathnameForMetadata } from '@shared/lib/seo/hreflangAlternates';
import { validateStartupEnv } from '../services/validateStartupEnv';

import { RootProviders } from './root-providers';

import '@widgets/styles/globals.css';
import 'keen-slider/keen-slider.min.css';

validateStartupEnv();

export async function generateMetadata(): Promise<Metadata> {
	const [pathname, locale] = await Promise.all([pathnameForMetadata(), getCachedSiteLocale()]);
	const href = hreflangAlternatesForPath(pathname);
	return {
		metadataBase: new URL(SITE_OPERATOR.publicOrigin),
		robots: { index: true, follow: true },
		authors: [{ name: 'Premium Design' }],
		icons: {
			icon: '/favicon.ico',
		},
		...href,
		openGraph: {
			locale: locale === 'en' ? 'en_US' : 'ru_RU',
			alternateLocale: locale === 'en' ? ['ru_RU'] : ['en_US'],
		},
	};
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export default async function RootLayout({ children }: PropsWithChildren) {
	const locale = await getCachedSiteLocale();

	return (
		<html
			lang={locale}
			className={`${inter.variable} ${playfair.variable}`}
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<body>
				<RootProviders initialSiteLocale={locale}>{children}</RootProviders>
			</body>
		</html>
	);
}
