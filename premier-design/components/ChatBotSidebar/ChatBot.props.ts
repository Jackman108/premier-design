import { ReactElement, ReactNode, SetStateAction } from "react";


export interface ChatState {
    messages: ReactElement[];
}

export interface MessageParserProps {
    children: ReactNode;
    actions: {
        handleHello: () => void;
        handleBye: () => void;
        handleServices: () => void;
        handlePortfolio: () => void;
        handlePricing: () => void;
        handleAppointment: () => void;
    };
}

export interface ActionProviderProps {
    createChatBotMessage: (message: string) => ReactElement;
    setState: React.Dispatch<SetStateAction<ChatState>>; 
    children: ReactNode;
}

export interface CustomAvatarProps {
    src: string;
    alt: string;    
}