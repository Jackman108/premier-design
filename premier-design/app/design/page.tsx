import type { Metadata } from 'next';

import { buildDesignHeadProps } from '@lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@lib/getStaticData';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import { Appeal, Costing, Examples, FaqSection, Features, OfferBanner, ProjectOffer } from '@lib/dynamicSectionImports';
import { selectAppealSectionData, selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { getTitleData } from '@shared/utils/findItemByTitle';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildDesignHeadProps(data));
}

export default async function DesignPage() {
	const data = await getCachedData();
	const head = buildDesignHeadProps(data);
	const { titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'design',
		'order_project',
		'design_banner',
	);
	const bannerProps: HeroBannerProps = { titleData, buttonData, bannerData };
	const titles = getTitleData(data.title, 'our-works', 'price-calculation', 'faq-section');

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...buildLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<Features features={data.features} />
				<OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.designType} />
				<Examples title={titles['our-works']} cards={data.examplesCard} />
				<Costing title={titles['price-calculation']} cards={data.costingCard} />
				<ProjectOffer
					data={data.offerProject.designType}
					buttonData={buttonData.buttonHeader}
					buttonStyle="button-black"
				/>
				<FaqSection sectionId="design-faq" title={titles['faq-section']} items={data.faqContent.design} />
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
}
