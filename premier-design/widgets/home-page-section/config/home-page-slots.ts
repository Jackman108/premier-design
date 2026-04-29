/**
 * Реестр стабильных id секций главной (аналитика, AB, паритет с febcode `landing-page-slots`). PD-R-02.
 * Порядок = порядок рендера в `HomePageSections`.
 */

export const HOME_PAGE_SECTION_IDS = [
	'home.hero',
	'home.features',
	'home.offer',
	'home.services',
	'home.approach',
	'home.steps',
	'home.examples',
	'home.trust',
	'home.video-spotlight',
	'home.costing',
	'home.related',
	'home.faq',
	'home.reviews',
	'home.lead-quiz',
	'home.appeal',
] as const;

export type HomePageSectionId = (typeof HOME_PAGE_SECTION_IDS)[number];
