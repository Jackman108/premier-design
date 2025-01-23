'use client'
import React, {FC} from "react";
import {Chatbot} from "react-chatbot-kit";
import chatbotConfig from '@features/buttons-panel/config/chatbotConfig';
import MessageParser from '@features/buttons-panel/logic/MessageParser';
import ActionProvider from '@features/buttons-panel/logic/ActionProvider';
import styles from './ChatBotSidebar.module.css';
import 'react-chatbot-kit/build/main.css'
import {useChatMessages} from "@features/buttons-panel/hooks/useChatMessages";
import PanelButton from "@features/buttons-panel/ui/PanelButton/PanelButton";
import {useModalState} from "@shared/hooks/useModalState";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";

interface ChatBotSidebarProps {
    panelData: PanelProps;
}

const ChatBotSidebar: FC<ChatBotSidebarProps> = ({panelData}) => {
    const {isOpen: isBotOpen, toggleModal} = useModalState();
    const [messages, saveMessages] = useChatMessages();


    return (
        <div>

            <PanelButton
                {...panelData}
                onClick={toggleModal}
            />
            <div>
                {isBotOpen && (
                    <div className={styles.chatbot}>
                        <Chatbot
                            config={chatbotConfig}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            messageHistory={messages.length > 0 ? messages : chatbotConfig.initialMessages}
                            saveMessages={saveMessages}
                            placeholderText='Задайте Ваш вопрос'
                            runInitialMessagesWithHistory={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBotSidebar;
