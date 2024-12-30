// hooks/usePageData.ts
import {findItemByTitle} from '../utils/findItemByTitle';
import {DataProps} from '../interface/interfaceData';
import {TitleProps} from "../interface/Title.props";
import {ButtonProps} from "../interface/Button.props";
import {BannerImageProps} from "../interface/Banner.props";
import {useMemo} from "react";

export const usePageData = (data: DataProps, titleShort: string, buttonShort: string, bannerShort: string) => {
    const titleData = useMemo(() => findItemByTitle(data.title, titleShort) || {} as TitleProps, [data.title, titleShort]);
    const buttonData = useMemo(() => findItemByTitle(data.button, buttonShort) || {} as ButtonProps, [data.button, buttonShort]);
    const bannerData = useMemo(() => findItemByTitle(data.bannersImages, bannerShort) || {} as BannerImageProps, [data.bannersImages, bannerShort]);


    return {titleData, buttonData, bannerData};
};
