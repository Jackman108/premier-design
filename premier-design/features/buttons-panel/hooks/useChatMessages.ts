import {useEffect, useState} from "react";
import {IMessage} from "react-chatbot-kit/build/src/interfaces/IMessages";

function loadChatMessagesFromStorage(): IMessage[] {
    try {
        const messagesString = localStorage.getItem('chat_messages');
        return messagesString ? (JSON.parse(messagesString) as IMessage[]) : [];
    } catch {
        return [];
    }
}

export const useChatMessages = (): [IMessage[], (messages: IMessage[]) => void] => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        queueMicrotask(() => setMessages(loadChatMessagesFromStorage()));
    }, []);

    const saveMessages = (next: IMessage[]) => {
        localStorage.setItem('chat_messages', JSON.stringify(next));
    };

    return [messages, saveMessages];
};
