import {BannerImageProps} from "@features/banner/hero/interface/HeroBannerProps";

export interface ShareBannerDataProps {
    shortTitle: string;
    link: string;
    imageDesc: BannerImageProps;
    imageMob: BannerImageProps;
}

export interface ShareBannerProps {
    isSticky: boolean;
    shares: ShareBannerDataProps[];
}