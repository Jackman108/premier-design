'use client'
import React, {FC} from "react";
import dynamic from 'next/dynamic';
import styles from './ChatBotSidebar.module.css';
import PanelButton from "@features/buttons-panel/ui/PanelButton/PanelButton";
import {ChatBotSidebarProps} from "@features/buttons-panel/interface/ChatBotSidebar.props";
import {useChatBotSidebar} from "@features/buttons-panel/hooks/useChatBotSidebar";

const ChatBotRuntime = dynamic(() => import('./ChatBotRuntime'), {
    ssr: false,
    loading: () => null,
});

const ChatBotSidebar: FC<ChatBotSidebarProps> = ({panelData}) => {
    const {isBotOpen, toggleModal, messageHistory, saveMessages} = useChatBotSidebar();


    return (
        <div>

            <PanelButton
                {...panelData}
                onClick={toggleModal}
            />
            <div>
                {isBotOpen && (
                    <div className={styles.chatbot}>
                        <ChatBotRuntime
                            messageHistory={messageHistory}
                            saveMessages={saveMessages}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBotSidebar;
