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

/** Якоря боковой навигации главной — подмножество `HOME_SECTION_SCROLL_SPY_ORDER` (без «Преимущества»). */
export const HOME_SECTION_NAV_LINKS = [
	{id: 'home-offer', label: 'Предложение'},
	{id: 'home-services', label: 'Услуги'},
	{id: 'home-approach', label: 'Подход'},
	{id: 'home-steps', label: 'Этапы'},
	{id: 'home-examples', label: 'Работы'},
	{id: 'home-trust', label: 'Доверие'},
	{id: 'home-costing', label: 'Смета'},
	{id: 'home-related', label: 'Ещё услуги'},
	{id: 'home-faq', label: 'Вопросы'},
	{id: 'home-reviews', label: 'Отзывы'},
	{id: 'lead-quiz', label: 'Квиз'},
	{id: 'home-appeal', label: 'Заявка'},
] as const;

export type HomeSectionNavLink = (typeof HOME_SECTION_NAV_LINKS)[number];

export const HOME_SECTION_NAV_IDS = HOME_SECTION_NAV_LINKS.map((item) => item.id);
