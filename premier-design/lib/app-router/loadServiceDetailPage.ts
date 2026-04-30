import { cache } from 'react';
import { notFound } from 'next/navigation';

import type { ServiceDetailProps } from '@features/services/interface/ServiceDetail.props';
import { getCachedData } from '@lib/getStaticData';
import { findService } from '@lib/staticProps/findService';
import { getCommonProps } from '@lib/staticProps/getCommonProps';

export const loadServiceDetailPageProps = cache(
	async (categoryId: string, serviceId: string): Promise<ServiceDetailProps> => {
		try {
			const data = await getCachedData();
			const found = findService(data, categoryId, serviceId);
			return {
				...found,
				...getCommonProps(data),
			};
		} catch {
			notFound();
		}
	},
);
