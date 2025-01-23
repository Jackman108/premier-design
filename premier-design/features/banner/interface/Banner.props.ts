import {ButtonProps} from "@shared/interface/Button.props";
import {TitleProps} from "@shared/ui/title/interface/Title.props";

export interface BannerImageProps {
    shortTitle: string;
    src: string;
    alt: string;
    quality: number;
    width: number;
    height: number;
}

export interface BannerProps {
    bannerData: BannerImageProps;
    buttonData: ButtonProps;
    titleData: TitleProps;
}
