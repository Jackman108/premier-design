import {NextPage} from 'next';

import {HeroBanner, type HeroBannerProps} from '@features/banner';
import {getStaticProps} from '@lib/getStaticData';
import {selectAppealSectionData, usePageData} from '@shared/hooks/usePageData';
import {useScrollReveal} from '@shared/hooks/useScrollReveal';
import {getTitleData} from '@shared/utils/findItemByTitle';
import {mapFaqEntriesToStructuredData} from '@shared/utils/faqStructuredData';
import {
	Appeal,
	Approach,
	Costing,
	Examples,
	FaqSection,
	Features,
	OfferBanner,
	RelatedServices,
	Reviews,
	Services,
	StepsWork,
	LeadQuiz,
	TrustSignals,
	VideoSpotlight,
} from '@lib/dynamicSectionImports';
import {GetDataProps} from '@widgets/interface/interfaceData';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import Layout from '@widgets/layout/ui/layout/Layout';
import HomePageChrome from '@widgets/home-page-chrome/ui/HomePageChrome';
import HomePageSection from '@widgets/home-page-section/ui/HomePageSection/HomePageSection';

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

	const a11y = data.homePage.sectionAriaLabels;

	return (
		<>
			<CustomHead
				{...titleData}
				faqForStructuredData={faqForHead}
				structuredDataRating={data.trustSignals.structuredDataRating}
			/>
			<Layout {...useLayoutProps(data)}>
				<HomePageChrome />
				<HomePageSection id='home-hero' layout='hero'>
					<HeroBanner {...bannerProps} />
				</HomePageSection>

				<HomePageSection id='home-features' aria-label={a11y.features} layout='features'>
					<Features features={data.features} />
				</HomePageSection>

				<HomePageSection
					id='home-offer'
					aria-label={a11y.offer}
					layout='content'
					density='compact'
				>
					<OfferBanner ctaLabel={buttonData.buttonHeader} offer={data.offerBanner.homeType} />
				</HomePageSection>

				<HomePageSection id='home-services' aria-label={a11y.services} layout='content' width='wide'>
					<Services title={titles.services} buttons={data.button} servicesCard={data.servicesCard} />
				</HomePageSection>

				<HomePageSection id='home-approach' aria-label={a11y.approach} layout='content'>
					<Approach title={titles['our-approach']} cards={data.approachCard} />
				</HomePageSection>

				<HomePageSection
					id='home-steps'
					aria-label={a11y.steps}
					layout='content'
					density='compact'
				>
					<StepsWork title={titles['application-process']} stepsWork={data.stepsWork} />
				</HomePageSection>

				<HomePageSection id='home-examples' aria-label={a11y.examples} layout='content' width='wide'>
					<Examples title={titles['our-works']} cards={data.examplesCard} />
				</HomePageSection>

				<HomePageSection id='home-trust' aria-label={a11y.trust} layout='content'>
					<TrustSignals
						reviews={data.reviews}
						features={data.features}
						metrics={data.trustSignals.metrics}
					/>
				</HomePageSection>

				{data.homeVideoSpotlight.youtubeId.trim() ? (
					<HomePageSection layout='content'>
						<VideoSpotlight
							sectionId='home-video-spotlight'
							title={data.homeVideoSpotlight.title}
							description={data.homeVideoSpotlight.description}
							youtubeId={data.homeVideoSpotlight.youtubeId}
						/>
					</HomePageSection>
				) : null}

				<HomePageSection
					id='home-costing'
					aria-label={a11y.costing}
					layout='content'
					density='compact'
				>
					<Costing title={titles['price-calculation']} cards={data.costingCard} />
				</HomePageSection>

				<HomePageSection id='home-related' aria-label={a11y.related} layout='content'>
					<RelatedServices
						title={titles['related-services']}
						relatedServices={data.relatedServices}
					/>
				</HomePageSection>

				<HomePageSection aria-label={a11y.faq} layout='content' density='compact'>
					<FaqSection
						sectionId='home-faq'
						title={titles['faq-section']}
						items={data.faqContent.home}
					/>
				</HomePageSection>

				<HomePageSection id='home-reviews' aria-label={a11y.reviews} layout='content'>
					<Reviews title={titles.customer_reviews} reviews={data.reviews} />
				</HomePageSection>

				<HomePageSection layout='content' density='compact'>
					<LeadQuiz ctaLabel={buttonData.buttonHeader} />
				</HomePageSection>

				<HomePageSection
					id='home-appeal'
					aria-label={a11y.appeal}
					layout='content'
					density='compact'
				>
					<Appeal {...selectAppealSectionData(data.title, data.button, data.bannersImages)} />
				</HomePageSection>
			</Layout>
		</>
	);
};

export {getStaticProps};
export default Home;
