'use client';

import {Chatbot} from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import chatbotConfig from '@features/buttons-panel/config/chatbotConfig';
import type {ChatBotRuntimeProps} from '@features/buttons-panel/interface/ChatBotRuntime.props';
import MessageParser from '@features/buttons-panel/logic/MessageParser';
import ActionProvider from '@features/buttons-panel/logic/ActionProvider';

const ChatBotRuntime = ({messageHistory, saveMessages}: ChatBotRuntimeProps) => {
    const effectiveHistory = messageHistory.length > 0 ? messageHistory : chatbotConfig.initialMessages;

    return (
        <Chatbot
            config={chatbotConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={effectiveHistory}
            saveMessages={saveMessages}
            placeholderText="Задайте Ваш вопрос"
            runInitialMessagesWithHistory
        />
    );
};

export default ChatBotRuntime;
