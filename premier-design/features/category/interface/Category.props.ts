import {TitleProps} from "@shared/ui/title/interface/Title.props";
import {ButtonProps} from "@shared/interface/Button.props";
import type {DataProps} from "@shared/validates/dataPropsSchema";
import type {Category, PriceItem} from "@shared/interface/CategoryPrice.props";

export type {Category, PriceItem};

export type Prices = DataProps["prices"];

export interface CategoryProps {
	titles: TitleProps[];
	repairs: Category[];
	buttonData: ButtonProps[];
}
