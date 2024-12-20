// hooks/usePageData.ts
import {findItemByShortTitle} from '../pages/api/constants';
import {BannerData, ButtonData, DataProps, OfferListProps, TitleData} from '../interface/interfaceData';

export const usePageData = (data: DataProps, titleShort: string, buttonShort: string, bannerShort: string, offerListShort?: string) => {
    const titleData = findItemByShortTitle(data.title, titleShort) || {} as TitleData;
    const buttonData = findItemByShortTitle(data.button, buttonShort) || {} as ButtonData;
    const bannerData = findItemByShortTitle(data.bannersImages, bannerShort) || {} as BannerData;

    const offerListData: OfferListProps | undefined = offerListShort
        ? findItemByShortTitle(data.offerList, offerListShort)
        : undefined;

    return {titleData, buttonData, bannerData, offerListData};
};
