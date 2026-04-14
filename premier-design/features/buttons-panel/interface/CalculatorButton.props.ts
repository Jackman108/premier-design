import {CostingCardProps} from "@features/coasting/interface/Costing.props";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";

export interface CalculatorButtonProps {
    costingCards: CostingCardProps[];
    panelData: PanelProps;
}