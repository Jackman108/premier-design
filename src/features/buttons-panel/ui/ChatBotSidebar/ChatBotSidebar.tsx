'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

import PanelButton from '@features/buttons-panel/ui/PanelButton/PanelButton';
import { ChatBotSidebarProps } from '@features/buttons-panel/interface/ChatBotSidebar.props';
import { useChatBotSidebar } from '@features/buttons-panel/hooks/useChatBotSidebar';

import styles from './ChatBotSidebar.module.css';

const ChatBotRuntime = dynamic(() => import('./ChatBotRuntime'), {
	ssr: false,
	loading: () => null,
});

const ChatBotSidebar: FC<ChatBotSidebarProps> = ({ panelData }) => {
	const { isBotOpen, toggleModal, messageHistory, saveMessages } = useChatBotSidebar();

	return (
		<div className={styles.chatRoot}>
			<PanelButton {...panelData} onClick={toggleModal} />
			{isBotOpen ? (
				<div className={styles.chatbot} role="dialog" aria-label="Чат с консультантом">
					<button type="button" className={styles.closeButton} onClick={toggleModal} aria-label="Закрыть чат">
						×
					</button>
					<ChatBotRuntime messageHistory={messageHistory} saveMessages={saveMessages} />
				</div>
			) : null}
		</div>
	);
};

export default ChatBotSidebar;
