import type {ReactNode} from 'react';

import DocumentSiteShell from './DocumentSiteShell';
import {getData} from '../../lib/getStaticData';
import {buildLayoutProps} from '@widgets/layout/lib/buildLayoutProps';

export default async function DocumentsLayout({children}: {children: ReactNode}) {
	const data = await getData();
	const {headerProps, footerProps, additionalData} = buildLayoutProps(data);

	return (
		<DocumentSiteShell additionalData={additionalData} footerProps={footerProps} headerProps={headerProps}>
			{children}
		</DocumentSiteShell>
	);
}
