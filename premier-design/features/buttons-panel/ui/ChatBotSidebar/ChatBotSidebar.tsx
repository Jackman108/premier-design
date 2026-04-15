'use client'
import React, {FC} from "react";
import {Chatbot} from "react-chatbot-kit";
import chatbotConfig from '@features/buttons-panel/config/chatbotConfig';
import MessageParser from '@features/buttons-panel/logic/MessageParser';
import ActionProvider from '@features/buttons-panel/logic/ActionProvider';
import styles from './ChatBotSidebar.module.css';
import 'react-chatbot-kit/build/main.css'
import PanelButton from "@features/buttons-panel/ui/PanelButton/PanelButton";
import {ChatBotSidebarProps} from "@features/buttons-panel/interface/ChatBotSidebar.props";
import {useChatBotSidebar} from "@features/buttons-panel/hooks/useChatBotSidebar";

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
                        <Chatbot
                            config={chatbotConfig}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            messageHistory={messageHistory}
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
