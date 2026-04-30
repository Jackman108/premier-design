import type { Metadata } from 'next';

import { buildHomeHeadProps } from '@lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@lib/getStaticData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildHomeHeadProps(data));
}
