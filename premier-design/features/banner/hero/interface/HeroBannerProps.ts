import type { BannerImageProps } from '@entities/banner';
import type { ButtonProps } from '@entities/button';
import type { TitleProps } from '@entities/title';

export type { BannerImageProps } from '@entities/banner';

export interface HeroBannerProps {
	bannerData: BannerImageProps;
	buttonData: ButtonProps;
	titleData: TitleProps;
	/** Буллеты под заголовком; если не переданы — используются значения по умолчанию. */
	highlights?: string[];
}
