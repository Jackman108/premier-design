import {ButtonProps} from "@shared/interface/Button.props";
import {TitleProps} from "@shared/ui/title/interface/Title.props";
import type {BannerImageProps} from "@shared/interface/BannerImage.props";

export type {BannerImageProps} from "@shared/interface/BannerImage.props";

export interface HeroBannerProps {
	bannerData: BannerImageProps;
	buttonData: ButtonProps;
	titleData: TitleProps;
	/** Буллеты под заголовком; если не переданы — используются значения по умолчанию. */
	highlights?: string[];
}
