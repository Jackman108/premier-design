import React, {FC} from 'react';
import dynamic from 'next/dynamic';
import PanelButton from "@features/buttons-panel/ui/PanelButton/PanelButton";
import {useModalState} from "@shared/hooks/useModalState";
import {CalculatorButtonProps} from "@features/buttons-panel/interface/CalculatorButton.props";

const CalculatorModal = dynamic(() => import('@shared/ui/calculator-modal/ui/CalculatorModal/CalculatorModal'), {
    ssr: false,
    loading: () => null,
});

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
