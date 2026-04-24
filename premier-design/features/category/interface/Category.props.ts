import {TitleProps} from "@shared/ui/title/interface/Title.props";
import {ButtonProps} from "@shared/interface/Button.props";
import type {Category, PriceItem} from "@shared/interface/CategoryPrice.props";

export type {Category, PriceItem};

export interface Prices {
	repairs: Category[];
	design: Category[];
}

export interface CategoryProps {
	titles: TitleProps[];
	repairs: Category[];
	buttonData: ButtonProps[];
}
