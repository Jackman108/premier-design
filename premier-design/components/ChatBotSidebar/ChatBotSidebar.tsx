'use client'
import {ReactElement, useEffect, useState} from "react";
import {Chatbot} from "react-chatbot-kit";
import chatbotConfig from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './ChatBotSidebar.module.css';
import 'react-chatbot-kit/build/main.css'
import {IMessage} from "react-chatbot-kit/build/src/interfaces/IMessages";

const ChatBotSidebar = (): ReactElement => {
    const [isBotOpen, setIsBotOpen] = useState(false);

    // Загрузка сообщений из localStorage при открытии компонента
    useEffect(() => {
        const messages = loadMessages();
        if (messages.length > 0) {
            saveMessages(messages);
        }
    }, []);

    const saveMessages = (messages: IMessage[]) => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
    };

    const loadMessages = (): IMessage[] => {
        const messagesString = localStorage.getItem('chat_messages');
        return messagesString ? JSON.parse(messagesString) : [];

    };

    return (
        <div>
            <button
                onClick={() => setIsBotOpen((prev) => !prev)}
                className={styles.toggle_button}
            >
                {isBotOpen ? "Closed" : "Bot"}
            </button>
            <div>
                {isBotOpen && (
                    <div className={styles.chatbot}>
                        <Chatbot
                            config={chatbotConfig}
                            messageParser={MessageParser}
                            actionProvider={ActionProvider}
                            messageHistory={
                                loadMessages().length > 0
                                    ? loadMessages()
                                    : chatbotConfig.initialMessages}
                            saveMessages={saveMessages
                            }
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
