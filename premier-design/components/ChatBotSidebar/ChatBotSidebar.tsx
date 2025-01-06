'use client'
import React, {FC} from "react";
import {Chatbot} from "react-chatbot-kit";
import chatbotConfig from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './ChatBotSidebar.module.css';
import 'react-chatbot-kit/build/main.css'
import {useChatMessages} from "../../hooks/useChatMessages";
import PanelButton from "../UX/PanelButton/PanelButton";
import {PanelProps} from "../../interface/Panel.props";
import {useModalState} from "../../hooks/useModalState";

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
