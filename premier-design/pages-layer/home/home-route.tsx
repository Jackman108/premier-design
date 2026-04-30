import { buildHomeHeadProps } from '@lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@lib/getStaticData';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';

import HomePageClient from './HomePageClient';

export default async function HomeRoute() {
	const data = await getCachedData();
	const head = buildHomeHeadProps(data);
	return (
		<>
			<StructuredDataScript {...head} />
			<HomePageClient data={data} />
		</>
	);
}
