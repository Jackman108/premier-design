// hooks/usePageData.ts
import {findItemByTitle} from '../utils/findItemByTitle';
import {DataProps} from '../interface/interfaceData';
import {TitleProps} from "../interface/Title.props";
import {ButtonProps} from "../interface/Button.props";
import {BannerImageProps} from "../interface/Banner.props";
import {OfferListProps} from "../interface/OfferList.props";

export const usePageData = (data: DataProps, titleShort: string, buttonShort: string, bannerShort: string, offerListShort?: string) => {
    const titleData = findItemByTitle(data.title, titleShort) || {} as TitleProps;
    const buttonData = findItemByTitle(data.button, buttonShort) || {} as ButtonProps;
    const bannerData = findItemByTitle(data.bannersImages, bannerShort) || {} as BannerImageProps;

    const offerListData: OfferListProps | undefined = offerListShort
        ? findItemByTitle(data.offerList, offerListShort)
        : undefined;

    return {titleData, buttonData, bannerData, offerListData};
};
