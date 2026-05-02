import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import PanelButton from '@features/buttons-panel/ui/PanelButton/PanelButton';
import { useModalState } from '@shared/hooks/useModalState';
import { EstimateButtonProps } from '@features/buttons-panel/interface/EstimateButton.props';

const EstimateModal = dynamic(() => import('@shared/ui/estimate-modal/ui/EstimateModal/EstimateModal'), {
	ssr: false,
	loading: () => null,
});

const EstimateButton: FC<EstimateButtonProps> = ({ costingCards, panelData }) => {
	const { isOpen: isModalOpen, toggleModal } = useModalState(false);
	return (
		<>
			<PanelButton {...panelData} onClick={toggleModal} />
			{isModalOpen && <EstimateModal cards={costingCards} card={costingCards[0]} onClose={toggleModal} />}
		</>
	);
};

export default EstimateButton;
