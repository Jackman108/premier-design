'use client'
import React, {ReactElement, useEffect, useState} from "react";
import {Chatbot} from "react-chatbot-kit";
import chatbotConfig from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './ChatBotSidebar.module.css';
import 'react-chatbot-kit/build/main.css'
import {IMessage} from "react-chatbot-kit/build/src/interfaces/IMessages";
import Image from "next/image";

const ChatBotSidebar = (): ReactElement => {
    const [isBotOpen, setIsBotOpen] = useState(false);
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const loadedMessages = loadMessages();
        setMessages(loadedMessages);
        if (loadedMessages.length > 0) {
            saveMessages(loadedMessages);
        }
    }, []);

    const saveMessages = (messages: IMessage[]) => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
    };

    const loadMessages = (): IMessage[] => {
        const messagesString = localStorage.getItem('chat_messages');
        return messagesString ? JSON.parse(messagesString) : [];

    };

    const handleToggle = () => {
        setIsBotOpen(prev => !prev);
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className={styles.toggle_button}
            >
                <Image
                    src="/panel/chat.svg"
                    alt="Чат"
                    width={40}
                    height={36}
                    className={styles.button_icon}
                />
                <div className={styles.sticky_button_text}>
                    <span>Спросить в чате</span>
                </div>
            </button>
            <div>
                {isBotOpen && (
                    <div className={styles.chatbot}>
                        <Chatbot
                            config={chatbotConfig}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            messageHistory={
                                messages.length > 0
                                    ? messages
                                    : chatbotConfig.initialMessages}
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
