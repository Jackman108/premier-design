/** Якоря секций главной — синхронно с `id` в `pages/index.tsx` (кроме `#lead-quiz` на самом квизе). */
export const HOME_SECTION_NAV_LINKS = [
	{id: 'home-features', label: 'Преимущества'},
	{id: 'home-offer', label: 'Предложение'},
	{id: 'home-services', label: 'Услуги'},
	{id: 'home-approach', label: 'Подход'},
	{id: 'home-steps', label: 'Этапы'},
	{id: 'home-examples', label: 'Работы'},
	{id: 'home-trust', label: 'Доверие'},
	{id: 'home-costing', label: 'Смета'},
	{id: 'home-related', label: 'Ещё услуги'},
	{id: 'lead-quiz', label: 'Квиз'},
	{id: 'home-reviews', label: 'Отзывы'},
	{id: 'home-appeal', label: 'Заявка'},
] as const;

export type HomeSectionNavLink = (typeof HOME_SECTION_NAV_LINKS)[number];

export const HOME_SECTION_NAV_IDS = HOME_SECTION_NAV_LINKS.map((item) => item.id);
