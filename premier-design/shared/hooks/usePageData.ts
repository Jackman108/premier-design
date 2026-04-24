import {findItemByTitle} from '@shared/utils/findItemByTitle';
import {getFullCanonicalUrl} from '@shared/utils/getFullCanonicalUrl';

type ItemWithTitle = { shortTitle: string };

/** Чистая выборка по `shortTitle` + canonical; не React Hook — вызывайте откуда угодно. */
export const selectPageData = <T extends ItemWithTitle, U extends ItemWithTitle, V extends ItemWithTitle>(
	titles: T[],
	buttons: U[],
	banners: V[],
	titleShort: string,
	buttonShort: string,
	bannerShort: string,
) => {
	const titleItem = findItemByTitle(titles, titleShort) ?? ({} as T);
	const buttonItem = findItemByTitle(buttons, buttonShort) ?? ({} as U);
	const bannerItem = findItemByTitle(banners, bannerShort) ?? ({} as V);

	const canonical =
		'canonical' in titleItem && typeof titleItem.canonical === 'string' ? getFullCanonicalUrl(titleItem.canonical) : '';

	return {titleItem: {...titleItem, canonical}, buttonItem, bannerItem};
};

/** Единый набор `shortTitle` для CTA «Appeal» на релевантных страницах (см. `data.json`). */
export const APPEAL_SECTION_PAGE_KEYS = {
	title: 'create-best-place',
	button: 'leave_request',
	banner: 'appeal_banner',
} as const;

/** Данные для `Appeal` без копипаста строк из `data.json`. */
export const selectAppealSectionData = <T extends ItemWithTitle, U extends ItemWithTitle, V extends ItemWithTitle>(
	titles: T[],
	buttons: U[],
	banners: V[],
) =>
	selectPageData(
		titles,
		buttons,
		banners,
		APPEAL_SECTION_PAGE_KEYS.title,
		APPEAL_SECTION_PAGE_KEYS.button,
		APPEAL_SECTION_PAGE_KEYS.banner,
	);

export const usePageData = selectPageData;