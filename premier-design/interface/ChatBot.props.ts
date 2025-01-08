import {Dispatch, ReactElement, ReactNode, SetStateAction} from "react";

export interface ChatState {
    messages: ReactElement[];
}

export interface Actions {
    handleHello: () => void;
    handleBye: () => void;
    handleServices: () => void;
    handlePortfolio: () => void;
    handlePricing: () => void;
    handleAppointment: () => void;
}

export interface MessageParserProps {
    children: ReactNode;
    actions: Actions;
}

export interface ActionProviderProps {
    createChatBotMessage: (message: string) => ReactElement;
    setState: Dispatch<SetStateAction<ChatState>>;
    children: ReactNode;
}

export interface CustomAvatarProps {
    src: string;
    alt: string;
}