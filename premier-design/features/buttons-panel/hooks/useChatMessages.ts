import {useEffect, useState} from "react";
import {IMessage} from "react-chatbot-kit/build/src/interfaces/IMessages";

export const useChatMessages = (): [IMessage[], (messages: IMessage[]) => void] => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const loadedMessages = loadMessages();
        setMessages(loadedMessages);
    }, []);

    const saveMessages = (messages: IMessage[]) => {
        localStorage.setItem("chat_messages", JSON.stringify(messages));
    };

    const loadMessages = (): IMessage[] => {
        const messagesString = localStorage.getItem("chat_messages");
        return messagesString ? JSON.parse(messagesString) : [];
    };

    return [messages, saveMessages];
};
