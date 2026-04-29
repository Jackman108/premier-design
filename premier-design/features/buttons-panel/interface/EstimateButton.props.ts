import type { CostingCardProps } from '@entities/costing';
import type { PanelProps } from '@entities/panel';

export interface EstimateButtonProps {
    costingCards: CostingCardProps[];
    panelData: PanelProps;
}
