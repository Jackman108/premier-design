import type { CostingCardProps } from '@features/coasting';
import type { ButtonProps } from '@entities/button';
import type { PanelProps } from '@features/buttons-panel';

export interface ButtonsPanelProps {
	additionalData: {
		costingCards: CostingCardProps[];
		buttonData: ButtonProps[];
		panelData: PanelProps[];
	};
}
