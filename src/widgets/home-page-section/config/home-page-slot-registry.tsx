import type { ReactElement } from 'react';

import { HeroBanner } from '@features/banner';
import type { HeroBannerProps } from '@features/banner';
import {
	Appeal,
	Approach,
	Costing,
	Examples,
	FaqSection,
	Features,
	LeadQuiz,
	OfferBanner,
	RelatedServices,
	Reviews,
	Services,
	StepsWork,
	TrustSignals,
	VideoSpotlight,
} from '@shared/lib/dynamicSectionImports';
import { selectAppealSectionData } from '@shared/hooks/usePageData';
import type { TitleProps } from '@shared/ui/title/interface/Title.props';
import type { DataProps } from '@shared/validates/dataPropsSchema';

import HomePageSection from '../ui/HomePageSection/HomePageSection';

import type { HomePageSectionId } from './home-page-slots';
import { HOME_PAGE_SECTION_IDS } from './home-page-slots';

export type HomePageSlotRenderContext = {
	data: DataProps;
	bannerProps: HeroBannerProps;
	titles: Record<string, TitleProps>;
	buttonHeader: string;
};

export type HomePageRegisteredSlot = {
	slotId: HomePageSectionId;
	render: (ctx: HomePageSlotRenderContext) => ReactElement | null;
};

/**
 * Реестр слотов главной (§9 этап 9.2 / BP-24): порядок = `HOME_PAGE_SECTION_IDS`.
 * DOM `id` якорей сохраняет совместимость с e2e и `homeSectionNavConfig`.
 */
export const HOME_PAGE_REGISTERED_SLOTS: HomePageRegisteredSlot[] = [
	{
		slotId: 'home.hero',
		render: ({ bannerProps }) => (
			<HomePageSection id="home-hero" dataSlotId="home.hero" layout="hero">
				<HeroBanner {...bannerProps} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.features',
		render: ({ data }) => (
			<HomePageSection
				id="home-features"
				dataSlotId="home.features"
				aria-label={data.homePage.sectionAriaLabels.features}
				layout="features"
			>
				<Features features={data.features} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.offer',
		render: ({ data, buttonHeader }) => (
			<HomePageSection
				id="home-offer"
				dataSlotId="home.offer"
				aria-label={data.homePage.sectionAriaLabels.offer}
				layout="content"
				density="compact"
			>
				<OfferBanner ctaLabel={buttonHeader} offer={data.offerBanner.homeType} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.services',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-services"
				dataSlotId="home.services"
				aria-label={data.homePage.sectionAriaLabels.services}
				layout="content"
				width="wide"
			>
				<Services title={titles.services} buttons={data.button} servicesCard={data.servicesCard} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.approach',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-approach"
				dataSlotId="home.approach"
				aria-label={data.homePage.sectionAriaLabels.approach}
				layout="content"
			>
				<Approach title={titles['our-approach']} cards={data.approachCard} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.steps',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-steps"
				dataSlotId="home.steps"
				aria-label={data.homePage.sectionAriaLabels.steps}
				layout="content"
				density="compact"
			>
				<StepsWork title={titles['application-process']} stepsWork={data.stepsWork} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.examples',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-examples"
				dataSlotId="home.examples"
				aria-label={data.homePage.sectionAriaLabels.examples}
				layout="content"
				width="wide"
			>
				<Examples title={titles['our-works']} cards={data.examplesCard} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.trust',
		render: ({ data }) => (
			<HomePageSection
				id="home-trust"
				dataSlotId="home.trust"
				aria-label={data.homePage.sectionAriaLabels.trust}
				layout="content"
			>
				<TrustSignals reviews={data.reviews} features={data.features} metrics={data.trustSignals.metrics} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.video-spotlight',
		render: ({ data }) =>
			data.homeVideoSpotlight.youtubeId.trim() ? (
				<HomePageSection dataSlotId="home.video-spotlight" layout="content">
					<VideoSpotlight
						sectionId="home-video-spotlight"
						title={data.homeVideoSpotlight.title}
						description={data.homeVideoSpotlight.description}
						youtubeId={data.homeVideoSpotlight.youtubeId}
					/>
				</HomePageSection>
			) : null,
	},
	{
		slotId: 'home.costing',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-costing"
				dataSlotId="home.costing"
				aria-label={data.homePage.sectionAriaLabels.costing}
				layout="content"
				density="compact"
			>
				<Costing title={titles['price-calculation']} cards={data.costingCard} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.related',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-related"
				dataSlotId="home.related"
				aria-label={data.homePage.sectionAriaLabels.related}
				layout="content"
			>
				<RelatedServices title={titles['related-services']} relatedServices={data.relatedServices} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.faq',
		render: ({ data, titles }) => (
			<HomePageSection
				dataSlotId="home.faq"
				aria-label={data.homePage.sectionAriaLabels.faq}
				layout="content"
				density="compact"
			>
				<FaqSection sectionId="home-faq" title={titles['faq-section']} items={data.faqContent.home} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.reviews',
		render: ({ data, titles }) => (
			<HomePageSection
				id="home-reviews"
				dataSlotId="home.reviews"
				aria-label={data.homePage.sectionAriaLabels.reviews}
				layout="content"
			>
				<Reviews title={titles.customer_reviews} reviews={data.reviews} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.lead-quiz',
		render: ({ data, buttonHeader }) => (
			<HomePageSection
				id="lead-quiz"
				dataSlotId="home.lead-quiz"
				aria-label={data.homePage.sectionAriaLabels.quiz}
				layout="content"
				density="compact"
			>
				<LeadQuiz ctaLabel={buttonHeader} />
			</HomePageSection>
		),
	},
	{
		slotId: 'home.appeal',
		render: ({ data }) => (
			<Appeal
				sectionId="home-appeal"
				aria-label={data.homePage.sectionAriaLabels.appeal}
				{...selectAppealSectionData(data.title, data.button, data.bannersImages)}
			/>
		),
	},
];

function assertHomePageSlotsAligned(slots: ReadonlyArray<HomePageRegisteredSlot>): void {
	if (process.env.NODE_ENV === 'production') {
		return;
	}
	const expected = [...HOME_PAGE_SECTION_IDS];
	const actual = slots.map((s) => s.slotId);
	const ok = actual.length === expected.length && actual.every((id, index) => id === expected[index]);
	if (!ok) {
		throw new Error(
			`HOME_PAGE_REGISTERED_SLOTS out of sync with HOME_PAGE_SECTION_IDS: ${JSON.stringify(actual)} vs ${JSON.stringify(expected)}`,
		);
	}
}

assertHomePageSlotsAligned(HOME_PAGE_REGISTERED_SLOTS);
