import type { Metadata, Viewport } from 'next';
import type { FC, PropsWithChildren } from 'react';

import { inter, playfair } from '@lib/interFont';
import { SITE_OPERATOR } from '@shared/constants/company';

import { RootProviders } from './root-providers';

import '@widgets/styles/globals.css';
import 'keen-slider/keen-slider.min.css';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_OPERATOR.publicOrigin),
	robots: { index: true, follow: true },
	authors: [{ name: 'Premium Design' }],
	icons: {
		icon: '/favicon.ico',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="ru" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
		<body>
			<RootProviders>{children}</RootProviders>
		</body>
	</html>
);

export default RootLayout;
