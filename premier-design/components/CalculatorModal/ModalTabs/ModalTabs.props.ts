import { CostingCardProps } from "../../../interface/interfaceData";
export interface ModalTabsProps {
    selectedTab: number;
    handleTabChange: (index: number) => void;
    data: CostingCardProps[];
}