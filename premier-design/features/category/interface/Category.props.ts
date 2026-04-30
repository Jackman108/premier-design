import { TitleProps } from '@shared/ui/title/interface/Title.props';
import type { ButtonProps } from '@entities/button';
import type { DataProps } from '@shared/validates/dataPropsSchema';
import type { Category, PriceItem } from '@entities/service';

export type { Category, PriceItem };

export type Prices = DataProps['prices'];

export interface CategoryProps {
	titles: TitleProps[];
	repairs: Category[];
	buttonData: ButtonProps[];
}
