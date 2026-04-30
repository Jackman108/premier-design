import { TitleProps } from '@shared/ui/title/interface/Title.props';
import type { CostingCardProps as SharedCostingCardProps } from '@entities/costing';

export type CostingCardProps = SharedCostingCardProps;

export interface CostingProps {
	cards: CostingCardProps[];
	title: TitleProps;
}
