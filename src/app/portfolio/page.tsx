import type { Metadata } from 'next';

import { buildPortfolioHeadProps } from '@shared/lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@shared/lib/getStaticData';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import PortfolioProjectSliders from '@features/examples/ui/PortfolioProjectSliders/PortfolioProjectSliders';
import { selectAppealSectionData, selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { getTitleData } from '@shared/utils/findItemByTitle';
import { Appeal, Features, OfferBanner } from '@shared/lib/dynamicSectionImports';
import { getCachedSiteBundle } from '@shared/lib/getStaticData';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildPortfolioHeadProps(data));
}

export default async function PortfolioPage() {
	const { data } = await getCachedSiteBundle();
	const head = buildPortfolioHeadProps(data);
	const {
		titleItem: titleData,
		buttonItem: buttonData,
		bannerItem: bannerData,
	} = selectPageData(data.titlesPage, data.button, data.bannersImages, 'portfolio', 'leave_request', 'design_banner');
	const bannerProps: HeroBannerProps = { titleData, buttonData, bannerData };
	const titles = getTitleData(data.title, 'our-works');

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...buildLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<Features features={data.features} />
				<OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.portfolioType} />
				<PortfolioProjectSliders cards={data.examplesCard} title={titles['our-works']} />
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
}
