import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {ButtonProps} from "@shared/interface/Button.props";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";

export interface ButtonsPanelProps {
    additionalData: {
        costingCards: CostingCardProps[];
        buttonData: ButtonProps[];
        panelData: PanelProps[];
    };
}