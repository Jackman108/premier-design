'use client';

import { usePathname } from 'next/navigation';

import { DOCUMENT_BREADCRUMB_ROUTES } from '@features/documents-content/utils/documentBreadcrumbRoutes';

export function useDocumentBreadcrumbs(): { pageTitle: string } | undefined {
	const pathname = usePathname();
	return pathname ? DOCUMENT_BREADCRUMB_ROUTES[pathname] : undefined;
}
