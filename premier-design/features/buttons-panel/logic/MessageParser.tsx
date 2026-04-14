'use client'
import React, {FC, ReactElement} from 'react';
import {Actions, MessageParserProps} from '@features/buttons-panel/interface/ChatBot.props';

const handlers: Record<string, keyof Actions> = {
    'привет': 'handleHello',
    'здравствуй': 'handleHello',
    'пока': 'handleBye',
    'до свидания': 'handleBye',
    'услуги': 'handleServices',
    'делаете': 'handleServices',
    'портфолио': 'handlePortfolio',
    'примеры': 'handlePortfolio',
    'цены': 'handlePricing',
    'стоимость': 'handlePricing',
    'стоит': 'handlePricing',
    'записаться': 'handleAppointment',
    'время': 'handleAppointment'
};

const MessageParser: FC<MessageParserProps> = ({children, actions}: MessageParserProps) => {

    const parseMessage = (message: string): void => {
        const lowerCaseMessage = message.toLowerCase()

        for (const [keyword, action] of Object.entries(handlers)) {
            if (lowerCaseMessage.includes(keyword) && actions[action]) {
                actions[action]();
                break;
            }
        }
    };

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as ReactElement<{
                        actions: Actions;
                        parse: (message: string) => void
                    }>, {parse: parseMessage, actions});
                }
                return child;
            })}
        </>
    );
};

export default MessageParser;
