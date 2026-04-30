import type { Metadata } from 'next';

import { buildRepairsHeadProps } from '@shared/lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@shared/lib/getStaticData';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import {
	Appeal,
	BusinessServices,
	Category,
	Costing,
	Examples,
	FaqSection,
	Features,
	OfferBanner,
	ProjectOffer,
} from '@shared/lib/dynamicSectionImports';
import { selectAppealSectionData, selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { getTitleData } from '@shared/utils/findItemByTitle';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildRepairsHeadProps(data));
}

export default async function RepairsPage() {
	const data = await getCachedData();
	const head = buildRepairsHeadProps(data);
	const {
		titleItem: titleData,
		buttonItem: buttonData,
		bannerItem: bannerData,
	} = selectPageData(data.titlesPage, data.button, data.bannersImages, 'repairs', 'leave_request', 'repair_banner');
	const bannerProps: HeroBannerProps = { titleData, buttonData, bannerData };
	const titles = getTitleData(data.title, 'our-works', 'price-calculation', 'faq-section');

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...buildLayoutProps(data)}>
				<HeroBanner {...bannerProps} />
				<Features features={data.features} />
				<OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.repairType} />
				<Examples title={titles['our-works']} cards={data.examplesCard} />
				<Category titles={data.title} repairs={data.prices.repairs} buttonData={data.button} />
				<BusinessServices
					titles={data.title}
					businessServices={data.businessServices}
					businessServiceCard={data.businessServiceCard}
					buttonData={data.button}
					buttonStyle="button-white"
				/>
				<Costing title={titles['price-calculation']} cards={data.costingCard} />
				<ProjectOffer
					data={data.offerProject.repairType}
					buttonData={buttonData.buttonHeader}
					buttonStyle="button-black"
				/>
				<FaqSection sectionId="repairs-faq" title={titles['faq-section']} items={data.faqContent.repairs} />
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
}
