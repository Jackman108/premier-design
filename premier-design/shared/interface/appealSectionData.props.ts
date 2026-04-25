import type {ButtonProps} from '@shared/interface/Button.props';
import type {BannerImageProps} from '@shared/interface/BannerImage.props';
import type {TitleProps} from '@shared/ui/title/interface/Title.props';

/** Данные для CTA `Appeal` (единый контракт для SSG, лейаутов и `AppealBanner`). */
export type AppealSectionData = {
	titleItem: TitleProps;
	buttonItem: ButtonProps;
	bannerItem: BannerImageProps;
	sectionId?: string;
	'aria-label'?: string;
};
