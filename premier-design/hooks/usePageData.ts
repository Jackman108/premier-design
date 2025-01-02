import {findItemByTitle} from '../utils/findItemByTitle';
import {DataProps} from '../interface/interfaceData';
import {TitleProps} from "../interface/Title.props";
import {ButtonProps} from "../interface/Button.props";
import {BannerImageProps} from "../interface/Banner.props";

export const usePageData = (data: DataProps, titleShort: string, buttonShort: string, bannerShort: string) => {
    const titleData = findItemByTitle(data.title, titleShort) || {} as TitleProps;
    const buttonData = findItemByTitle(data.button, buttonShort) || {} as ButtonProps;
    const bannerData = findItemByTitle(data.bannersImages, bannerShort) || {} as BannerImageProps;

    return {titleData, buttonData, bannerData};
};
