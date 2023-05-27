import { CostingCardProps } from "../../interface/interfaceData";

export interface CalculatorModalProps {
    onClose: () => void;
    card: CostingCardProps;
    data: CostingCardProps[];
}
