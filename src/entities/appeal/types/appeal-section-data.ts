import type { BannerImageProps } from '@entities/banner';
import type { ButtonProps } from '@entities/button';
import type { TitleProps } from '@entities/title';

/** Данные для CTA `Appeal` (единый контракт для SSG, лейаутов и `AppealBanner`). */
export type AppealSectionData = {
	titleItem: TitleProps;
	buttonItem: ButtonProps;
	bannerItem: BannerImageProps;
	sectionId?: string;
	'aria-label'?: string;
};
