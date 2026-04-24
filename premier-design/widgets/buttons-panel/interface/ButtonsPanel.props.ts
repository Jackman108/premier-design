import type {CostingCardProps} from '@features/coasting';
import {ButtonProps} from "@shared/interface/Button.props";
import type {PanelProps} from '@features/buttons-panel';

export interface ButtonsPanelProps {
    additionalData: {
        costingCards: CostingCardProps[];
        buttonData: ButtonProps[];
        panelData: PanelProps[];
    };
}