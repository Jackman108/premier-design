import React, {FC, useState} from 'react';
import CalculatorModal from '../../CalculatorModal/CalculatorModal';
import PanelButton from "../PanelButton/PanelButton";
import {PanelProps} from "../../../interface/Panel.props";
import {CostingCardProps} from "../../../interface/Costing.props";

interface CalculatorButtonProps {
    costingCards: CostingCardProps[];
    panelData: PanelProps;
}

const CalculatorButton: FC<CalculatorButtonProps> = ({costingCards, panelData}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen((prev) => !prev);

    return (
        <>
            <PanelButton
                {...panelData}
                onClick={toggleModal}
            />
            {isModalOpen && (
                <CalculatorModal
                    cards={costingCards}
                    card={costingCards[0]}
                    onClose={toggleModal}
                />
            )}
        </>
    );
};

export default CalculatorButton;
