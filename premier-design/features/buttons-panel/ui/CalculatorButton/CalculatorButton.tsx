import React, {FC} from 'react';
import CalculatorModal from '@shared/ui/calculator-modal/ui/CalculatorModal/CalculatorModal';
import PanelButton from "@features/buttons-panel/ui/PanelButton/PanelButton";
import {useModalState} from "@shared/hooks/useModalState";
import {CalculatorButtonProps} from "@features/buttons-panel/interface/CalculatorButton.props";

const CalculatorButton: FC<CalculatorButtonProps> = ({costingCards, panelData}) => {
    const {isOpen: isModalOpen, toggleModal} = useModalState(false);
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
