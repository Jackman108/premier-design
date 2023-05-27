import { CostingCardProps } from "../../pages/[types]/Data";

export interface CalculatorModalProps {
    onClose: () => void;
    card: CostingCardProps;
    data: CostingCardProps[];
}
