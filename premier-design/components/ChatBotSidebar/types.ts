import { ReactElement, ReactNode, SetStateAction } from "react";


export interface ChatState {
    messages: ReactElement[];
}

export interface MessageParserProps {
    children: ReactNode;
    actions: {
        handleHello: () => void;
        handleBye: () => void;
    };
}

export interface ActionProviderProps {
    createChatBotMessage: (message: string) => ReactElement;
    setState: React.Dispatch<SetStateAction<ChatState>>; 
    children: ReactNode;
}
