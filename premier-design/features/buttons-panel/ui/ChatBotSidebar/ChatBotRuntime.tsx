'use client';

import {Chatbot} from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import {IMessage} from 'react-chatbot-kit/build/src/interfaces/IMessages';

import chatbotConfig from '@features/buttons-panel/config/chatbotConfig';
import MessageParser from '@features/buttons-panel/logic/MessageParser';
import ActionProvider from '@features/buttons-panel/logic/ActionProvider';

interface ChatBotRuntimeProps {
    messageHistory: IMessage[];
    saveMessages: (messages: IMessage[]) => void;
}

const ChatBotRuntime = ({messageHistory, saveMessages}: ChatBotRuntimeProps) => {
    return (
        <Chatbot
            config={chatbotConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={messageHistory}
            saveMessages={saveMessages}
            placeholderText="Задайте Ваш вопрос"
            runInitialMessagesWithHistory
        />
    );
};

export default ChatBotRuntime;
