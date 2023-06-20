'use client'
import React, { FC, ReactElement, cloneElement } from 'react';
import { MessageParserProps } from '../../interface/ChatBot.props';

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
        if (actions.handleServices &&
            (lowerCaseMessage.includes('услуги') ||
                lowerCaseMessage.includes('делаете'))) {
            actions.handleServices();
        }
        if (actions.handlePortfolio &&
            lowerCaseMessage.includes('портфолио')||
            lowerCaseMessage.includes('примеры')) {
            actions.handlePortfolio();
        }
        if (actions.handlePricing &&
            lowerCaseMessage.includes('цены') ||
            lowerCaseMessage.includes('стоимость')||
            lowerCaseMessage.includes('стоит')) {
            actions.handlePricing();
        }
        if (actions.handleAppointment &&
            (lowerCaseMessage.includes('записаться') ||
                lowerCaseMessage.includes('время'))) {
            actions.handleAppointment();
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
