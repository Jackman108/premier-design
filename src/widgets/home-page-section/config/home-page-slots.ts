/**
 * Стабильные id слотов главной (BP-24 / §9 этап 9.2). Порядок = порядок в [`HOME_PAGE_REGISTERED_SLOTS`](./home-page-slot-registry.tsx).
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
