import {TitleProps} from "@shared/ui/title/interface/Title.props";
import type {CostingCardProps as SharedCostingCardProps} from "@shared/interface/CostingCard.props";

export type CostingCardProps = SharedCostingCardProps;

export interface CostingProps {
    cards: CostingCardProps[];
    title: TitleProps;
}
