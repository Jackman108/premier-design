'use client'
import React, { FC, ReactElement } from 'react';
import { ActionProviderProps, ChatState } from './types';

const ActionProvider: FC<ActionProviderProps> = ({
    createChatBotMessage,
    setState,
    children
}: ActionProviderProps) => {
    const handleHello = (): void => {
        const botMessage = createChatBotMessage('Чем могу быть полезна?');
        setState((prev: ChatState) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleBye = () => {
        const botMessage = createChatBotMessage('Рада была помочь!');
        setState((prev: ChatState) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    
    return (
        <>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child as ReactElement, {
                    actions: {
                        handleHello,
                        handleBye,
                    },
                });
            })}
        </>
    );
};

export default ActionProvider;
