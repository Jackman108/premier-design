'use client';

import type { HeroBannerProps } from '@features/banner/hero/interface/HeroBannerProps';
import { usePageData } from '@shared/hooks/usePageData';
import { useScrollReveal } from '@shared/hooks/useScrollReveal';
import { getTitleData } from '@shared/utils/findItemByTitle';
import type { DataProps } from '@shared/validates/dataPropsSchema';
import { useLayoutProps } from '@widgets/layout/hooks/useLayoutProps';
import Layout from '@widgets/layout/ui/layout/Layout';
import HomePageChrome from '@widgets/home-page-chrome/ui/HomePageChrome';
import { HomePageSections } from '@widgets/home-page-section/config/HomePageSections';
import type { FC } from 'react';

export type HomePageClientProps = {
	data: DataProps;
};

const HomePageClient: FC<HomePageClientProps> = ({ data }) => {
	useScrollReveal();

	const {
		titleItem: titleData,
		buttonItem: buttonData,
		bannerItem: bannerData,
	} = usePageData(data.titlesPage, data.button, data.bannersImages, 'home', 'leave_request', 'home_banner');

	const bannerProps: HeroBannerProps = {
		titleData,
		buttonData,
		bannerData,
		highlights: data.homeHeroHighlights,
	};

	const titles = getTitleData(
		data.title,
		'services',
		'our-approach',
		'application-process',
		'our-works',
		'price-calculation',
		'related-services',
		'customer_reviews',
		'faq-section',
	);

	return (
		<Layout {...useLayoutProps(data)}>
			<HomePageChrome />
			<HomePageSections
				data={data}
				bannerProps={bannerProps}
				titles={titles}
				buttonHeader={buttonData.buttonHeader}
			/>
		</Layout>
	);
};

export default HomePageClient;
