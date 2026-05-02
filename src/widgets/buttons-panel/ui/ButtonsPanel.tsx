'use client';

import dynamic from 'next/dynamic';
import React, { FC } from 'react';

import { UI, useLocale } from '@shared/i18n';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import { findItemByTitle } from '@shared/utils/findItemByTitle';
import { EstimateButton } from '@features/buttons-panel';

import { ButtonsPanelProps } from '../interface/ButtonsPanel.props';
import { findPanelById } from '../utils/findPanelById';
import styles from './ButtonsPanel.module.css';

const ChatBotSidebar = dynamic(() => import('@features/buttons-panel').then((m) => ({ default: m.ChatBotSidebar })), {
	ssr: false,
	loading: () => null,
});

const ButtonsPanel: FC<ButtonsPanelProps> = ({ additionalData }) => {
	const { t } = useLocale();
	const { costingCards, buttonData, panelData } = additionalData;

	const buttonHeader = findItemByTitle(buttonData, 'get_counseling');
	const phoneButton = findPanelById(panelData, 'phoneButton');
	const estimateButton = findPanelById(panelData, 'estimateButton');
	const chatButton = findPanelById(panelData, 'chatButton');

	return (
		<aside className={styles.buttonsContainer} aria-label={t(UI.panelQuickActionsAria)}>
			<div className={styles.buttonsDock}>
				{buttonHeader && (
					<OrderButton
						buttonStyle="button-panel"
						buttonData={buttonHeader.buttonHeader}
						panelData={phoneButton}
					/>
				)}
				{chatButton && <ChatBotSidebar panelData={chatButton} />}
				{estimateButton && <EstimateButton costingCards={costingCards} panelData={estimateButton} />}
			</div>
		</aside>
	);
};

export default ButtonsPanel;
