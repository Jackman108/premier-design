'use client';

import type {FC, ReactNode} from 'react';

import documentStyles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import type {LayoutProps} from '@widgets/layout/interface/Layout.props';
import Layout from '@widgets/layout/ui/layout/Layout';

type Props = Omit<LayoutProps, 'children'> & {children: ReactNode};

const DocumentSiteShell: FC<Props> = ({children, headerProps, footerProps, additionalData}) => {
	return (
		<Layout additionalData={additionalData} footerProps={footerProps} headerProps={headerProps}>
			<div className={documentStyles.documentShell}>{children}</div>
		</Layout>
	);
};

export default DocumentSiteShell;
