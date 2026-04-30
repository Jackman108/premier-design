import type { Metadata } from 'next';

import { buildAboutHeadProps } from '@lib/app-router/seo/marketingPagesHead';
import { getCachedData } from '@lib/getStaticData';
import HeroBanner from '@features/banner/hero/ui/HeroBanner';
import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import { CompanyAboutSections } from '@features/company-about';
import { News } from '@features/news';
import { Partners } from '@features/partners';
import { Appeal, OfferBanner } from '@lib/dynamicSectionImports';
import { selectAppealSectionData, selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { getTitleData } from '@shared/utils/findItemByTitle';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildAboutHeadProps(data));
}

export default async function AboutPage() {
	const data = await getCachedData();
	const head = buildAboutHeadProps(data);
	const { titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'about',
		'leave_request',
		'about_banner',
	);
	const bannerProps: HeroBannerProps = { titleData, buttonData, bannerData };
	const titles = getTitleData(data.title, 'news-shares', 'our-partners');

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...buildLayoutProps(data)} footerNewsHashSyncOnMount={false}>
				<HeroBanner {...bannerProps} />
				<CompanyAboutSections content={data.companyAbout} />
				<OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.aboutType} />
				<News title={titles['news-shares']} news={data.news} newsStyle="about" />
				<Partners title={titles['our-partners']} partners={data.partners} />
				<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
			</Layout>
		</>
	);
}
