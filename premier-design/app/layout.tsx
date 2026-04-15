import type {Metadata} from 'next';
import type {FC, PropsWithChildren} from 'react';

import {inter} from '@lib/interFont';
import {Providers} from './providers';
import '@widgets/styles/globals.css';
import 'keen-slider/keen-slider.min.css';

export const metadata: Metadata = {
	robots: {
		index: true,
		follow: true,
	},
	authors: [{name: 'Premier Design'}],
};

const RootLayout: FC<PropsWithChildren> = ({children}) => {
	return (
		<html lang="ru" className={inter.className} data-scroll-behavior="smooth">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
