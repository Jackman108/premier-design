import {CostingCardProps} from "./Costing.props";
import {ButtonProps} from "./Button.props";
import {PanelProps} from "./Panel.props";

export interface ButtonsPanelProps {
    additionalData: {
        costingCards: CostingCardProps[];
        buttonData: ButtonProps[];
        panelData: PanelProps[];
    };
}