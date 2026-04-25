import type {ReactNode} from 'react';

import DocumentSiteShell from './DocumentSiteShell';
import {getData} from '@lib/getStaticData';
import {buildLayoutProps} from '@widgets/layout/lib/buildLayoutProps';
import {selectAppealSectionData} from '@shared/hooks/usePageData';

export default async function DocumentsLayout({children}: {children: ReactNode}) {
	const data = await getData();
	const {headerProps, footerProps, additionalData} = buildLayoutProps(data, {headerVariant: 'solidDark'});
	const appealSection = selectAppealSectionData(data.title, data.button, data.bannersImages);

	return (
		<DocumentSiteShell
			additionalData={additionalData}
			appealSection={appealSection}
			footerProps={footerProps}
			headerProps={headerProps}
		>
			{children}
		</DocumentSiteShell>
	);
}
