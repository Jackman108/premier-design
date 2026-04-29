import type {ReactElement} from 'react';

import {HeroBanner, type HeroBannerProps} from '@features/banner';
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
import type {TitleProps} from '@shared/ui/title/interface/Title.props';
import type {DataProps} from '@shared/validates/dataPropsSchema';
import {selectAppealSectionData} from '@shared/hooks/usePageData';

import HomePageSection from '../ui/HomePageSection/HomePageSection';

export type HomePageSectionsProps = {
	data: DataProps;
	bannerProps: HeroBannerProps;
	titles: Record<string, TitleProps>;
	buttonHeader: string;
};

/** Секции главной ниже хрома — композиция по реестру [`HOME_PAGE_SECTION_IDS`](./home-page-slots.ts). */
export function HomePageSections({
	data,
	bannerProps,
	titles,
	buttonHeader,
}: HomePageSectionsProps): ReactElement {
	const a11y = data.homePage.sectionAriaLabels;

	return (
		<>
			<HomePageSection id='home-hero' layout='hero'>
				<HeroBanner {...bannerProps} />
			</HomePageSection>

			<HomePageSection id='home-features' aria-label={a11y.features} layout='features'>
				<Features features={data.features} />
			</HomePageSection>

			<HomePageSection id='home-offer' aria-label={a11y.offer} layout='content' density='compact'>
				<OfferBanner ctaLabel={buttonHeader} offer={data.offerBanner.homeType} />
			</HomePageSection>

			<HomePageSection id='home-services' aria-label={a11y.services} layout='content' width='wide'>
				<Services title={titles.services} buttons={data.button} servicesCard={data.servicesCard} />
			</HomePageSection>

			<HomePageSection id='home-approach' aria-label={a11y.approach} layout='content'>
				<Approach title={titles['our-approach']} cards={data.approachCard} />
			</HomePageSection>

			<HomePageSection id='home-steps' aria-label={a11y.steps} layout='content' density='compact'>
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

			<HomePageSection id='home-costing' aria-label={a11y.costing} layout='content' density='compact'>
				<Costing title={titles['price-calculation']} cards={data.costingCard} />
			</HomePageSection>

			<HomePageSection id='home-related' aria-label={a11y.related} layout='content'>
				<RelatedServices title={titles['related-services']} relatedServices={data.relatedServices} />
			</HomePageSection>

			<HomePageSection aria-label={a11y.faq} layout='content' density='compact'>
				<FaqSection sectionId='home-faq' title={titles['faq-section']} items={data.faqContent.home} />
			</HomePageSection>

			<HomePageSection id='home-reviews' aria-label={a11y.reviews} layout='content'>
				<Reviews title={titles.customer_reviews} reviews={data.reviews} />
			</HomePageSection>

			<HomePageSection id='lead-quiz' aria-label={a11y.quiz} layout='content' density='compact'>
				<LeadQuiz ctaLabel={buttonHeader} />
			</HomePageSection>

			<Appeal
				sectionId='home-appeal'
				aria-label={a11y.appeal}
				{...selectAppealSectionData(data.title, data.button, data.bannersImages)}
			/>
		</>
	);
}
