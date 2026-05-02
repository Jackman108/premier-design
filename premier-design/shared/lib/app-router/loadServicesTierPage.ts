import { cache } from 'react';
import { notFound } from 'next/navigation';

import { getCachedSiteBundle } from '@shared/lib/getStaticData';
import { getCommonProps } from '@shared/lib/staticProps/getCommonProps';
import { resolveServicesTier } from '@shared/lib/resolveServicesTier';
import type { ServicesTierPageProps } from '@widgets/services-tier/ui/ServicesTierPage/ServicesTierPage';

export const loadServicesTierPageProps = cache(async (categoryId: string): Promise<ServicesTierPageProps> => {
	const { data } = await getCachedSiteBundle();
	const resolved = resolveServicesTier(data, categoryId);
	if (!resolved) {
		notFound();
	}
	const common = getCommonProps(data);
	if (resolved.kind === 'repair') {
		return {
			tierKind: 'repair',
			category: resolved.category,
			...common,
		};
	}
	return {
		tierKind: 'related',
		relatedService: resolved.relatedService,
		...common,
	};
});
