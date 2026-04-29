import {NextPage} from 'next';

import type {HeroBannerProps} from '@features/banner';
import {getStaticProps} from '@lib/getStaticData';
import {usePageData} from '@shared/hooks/usePageData';
import {useScrollReveal} from '@shared/hooks/useScrollReveal';
import {getTitleData} from '@shared/utils/findItemByTitle';
import {mapFaqEntriesToStructuredData} from '@shared/utils/faqStructuredData';
import {GetDataProps} from '@widgets/interface/interfaceData';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import Layout from '@widgets/layout/ui/layout/Layout';
import HomePageChrome from '@widgets/home-page-chrome/ui/HomePageChrome';
import {HomePageSections} from '@widgets/home-page-section/config/HomePageSections';

const Home: NextPage<GetDataProps> = ({data}) => {
	useScrollReveal();

	const {titleItem: titleData, buttonItem: buttonData, bannerItem: bannerData} = usePageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'home',
		'leave_request',
		'home_banner',
	);

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

	const faqForHead = mapFaqEntriesToStructuredData(data.faqContent.home);

	return (
		<>
			<CustomHead
				{...titleData}
				faqForStructuredData={faqForHead}
				structuredDataRating={data.trustSignals.structuredDataRating}
			/>
			<Layout {...useLayoutProps(data)}>
				<HomePageChrome />
				<HomePageSections
					data={data}
					bannerProps={bannerProps}
					titles={titles}
					buttonHeader={buttonData.buttonHeader}
				/>
			</Layout>
		</>
	);
};

export {getStaticProps};
export default Home;
