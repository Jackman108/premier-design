import React, {FC, useState} from 'react';
import CalculatorModal from '../../CalculatorModal/CalculatorModal';
import {CostingCardProps} from '../../../interface/Cards.props';
import PanelButton from "../PanelButton/PanelButton";
import {PanelProps} from "../../../interface/Panel.props";

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
                id={panelData.id}
                onClick={toggleModal}
                icon={panelData.icon}
                altText={panelData.altText}
                text={panelData.text}
                position={panelData.position}
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
