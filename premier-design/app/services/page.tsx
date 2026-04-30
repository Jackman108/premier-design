import type { Metadata } from 'next';

import { buildServicesIndexHeadProps } from '@lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@lib/getStaticData';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import { ServiceCategoriesHub } from '@features/category';
import { Appeal, BusinessServices, RelatedServices } from '@lib/dynamicSectionImports';
import { selectAppealSectionData, selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { getTitleData } from '@shared/utils/findItemByTitle';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildServicesIndexHeadProps(data));
}

export default async function ServicesIndexPage() {
	const data = await getCachedData();
	const head = buildServicesIndexHeadProps(data);
	const { titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'services',
		'leave_request',
		'repair_banner',
	);
	const bannerProps: HeroBannerProps = { titleData, buttonData, bannerData };
	const titles = getTitleData(data.title, 'related-services');

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...buildLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<ServiceCategoriesHub titles={data.title} repairs={data.prices.repairs} buttonData={data.button} />
				<RelatedServices title={titles['related-services']} relatedServices={data.relatedServices} />
				<BusinessServices
					titles={data.title}
					businessServices={data.businessServices}
					businessServiceCard={data.businessServiceCard}
					buttonData={data.button}
					buttonStyle="button-white"
				/>
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
}
