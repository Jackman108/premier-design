import type { ShareBannerDataProps } from '@entities/share-banner';

export type { ShareBannerDataProps } from '@entities/share-banner';

export interface ShareBannerProps {
	isSticky: boolean;
	shares: ShareBannerDataProps[];
}
