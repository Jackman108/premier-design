import { buildHomeHeadProps } from '@shared/lib/app-router/seo/marketingPagesHead';
import { getCachedSiteBundle } from '@shared/lib/getStaticData';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';

import HomePageClient from './HomePageClient';

export default async function HomeRoute() {
	const { data } = await getCachedSiteBundle();
	const head = buildHomeHeadProps(data);
	return (
		<>
			<StructuredDataScript {...head} />
			<HomePageClient data={data} />
		</>
	);
}
