import {findItemByTitle} from '../utils/findItemByTitle';
import {getFullCanonicalUrl} from "../utils/getFullCanonicalUrl";

type ItemWithTitle = { shortTitle: string };

export const usePageData = <T extends ItemWithTitle, U extends ItemWithTitle, V extends ItemWithTitle>(
    titles: T[], buttons: U[], banners: V[],
    titleShort: string, buttonShort: string, bannerShort: string
) => {
    const titleItem = findItemByTitle(titles, titleShort) ?? ({} as T);
    const buttonItem = findItemByTitle(buttons, buttonShort) ?? ({} as U);
    const bannerItem = findItemByTitle(banners, bannerShort) ?? ({} as V);

    const fullCanonical = 'canonical' in titleItem && typeof titleItem.canonical === 'string'
        ? getFullCanonicalUrl(titleItem.canonical)
        : '';

    return {titleItem: {...titleItem, fullCanonical}, buttonItem, bannerItem};
};