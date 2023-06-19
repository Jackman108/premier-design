'use client'
import { FC, useState } from "react";
import { Chatbot } from "react-chatbot-kit";
import { ChatState } from "./types";
import chatbotConfig from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './ChatBotSidebar.module.css';
import 'react-chatbot-kit/build/main.css'

const ChatBotSidebar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const saveMessages = (messages: ChatState) => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
    };
    const loadMessages = () => {
        const messagesString = localStorage.getItem('chat_messages');
        const messages = messagesString ? JSON.parse(messagesString) : [];
        return messages;
    };
    return (
        <div>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={styles.toggle_button}
            >
                Bot
            </button>
            <div>
                {isOpen && (
                    <div className={styles.chatbot}>
                        <Chatbot
                            config={chatbotConfig}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            messageHistory={loadMessages().length > 0 ? loadMessages() : chatbotConfig.initialMessages}
                            saveMessages={saveMessages}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatBotSidebar;
