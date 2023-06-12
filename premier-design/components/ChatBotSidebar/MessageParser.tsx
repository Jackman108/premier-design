'use client'
import React, { FC, ReactElement, cloneElement } from 'react';
import { MessageParserProps } from './types';

const MessageParser: FC<MessageParserProps> = ({
    children,
    actions
}: MessageParserProps) => {

    const parse = (message: string): void => {
        const lowerCaseMessage = message.toLowerCase()

        if (actions.handleHello &&
            (lowerCaseMessage.includes('привет') ||
                lowerCaseMessage.includes('здравствуй'))) {
            actions.handleHello();
        }
        if (actions.handleBye &&
            (lowerCaseMessage.includes('пока') ||
                lowerCaseMessage.includes('до свидания'))) {
            actions.handleBye();
        }
    };

    return (
        <>
            {React.Children.map(children, (child) => {
                return cloneElement(child as ReactElement, {
                    parse: parse,
                    actions,
                });
            })}
        </>
    );
};

export default MessageParser;
