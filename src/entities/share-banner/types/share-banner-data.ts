import type { BannerImageProps } from '@entities/banner';

export interface ShareBannerDataProps {
	shortTitle: string;
	link: string;
	imageDesc: BannerImageProps;
	imageMob: BannerImageProps;
}
