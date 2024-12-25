import {ButtonProps} from "./Button.props";
import {TitleProps} from "./Title.props";

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
    buttonStyle: 'button-white' | 'button-black' | 'button-none';
}
