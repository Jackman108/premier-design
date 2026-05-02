/** Секции `pages/index.tsx` в порядке сверху вниз — для scroll-spy (в т.ч. `home-features` без ссылки в боковом меню). */
export const HOME_SECTION_SCROLL_SPY_ORDER = [
	'home-hero',
	'home-features',
	'home-offer',
	'home-services',
	'home-approach',
	'home-steps',
	'home-examples',
	'home-trust',
	'home-video-spotlight',
	'home-costing',
	'home-related',
	'home-faq',
	'home-reviews',
	'lead-quiz',
	'home-appeal',
] as const;

/** Якоря боковой навигации главной — подмножество `HOME_SECTION_SCROLL_SPY_ORDER` (без «Преимущества»). Подписи в `data/locales/<locale>/ui.json`, ключи `homeChrome.nav.*`. */
export const HOME_SECTION_NAV_LINKS = [
	{ id: 'home-offer' },
	{ id: 'home-services' },
	{ id: 'home-approach' },
	{ id: 'home-steps' },
	{ id: 'home-examples' },
	{ id: 'home-trust' },
	{ id: 'home-costing' },
	{ id: 'home-related' },
	{ id: 'home-faq' },
	{ id: 'home-reviews' },
	{ id: 'lead-quiz' },
	{ id: 'home-appeal' },
] as const;

export type HomeSectionNavLink = (typeof HOME_SECTION_NAV_LINKS)[number];

export const HOME_SECTION_NAV_IDS = HOME_SECTION_NAV_LINKS.map((item) => item.id);
