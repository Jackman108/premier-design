'use client'
import React, {FC, ReactElement, SetStateAction} from 'react';
import {ActionProviderProps, Actions, ChatState} from '@features/buttons-panel/interface/ChatBot.props';

const sendMessage = (
    createChatBotMessage: (message: string) => ReactElement,
    setState: React.Dispatch<SetStateAction<ChatState>>,
    message: string
) => {
    const botMessage = createChatBotMessage(message);
    setState((prev: ChatState) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
    }));
};

const ActionProvider: FC<ActionProviderProps> = ({createChatBotMessage, setState, children}) => {

    const handleHello = () => sendMessage(createChatBotMessage, setState, 'Чем могу быть полезна?');
    const handleBye = () => sendMessage(createChatBotMessage, setState, 'Рада была помочь!');
    const handleServices = () => sendMessage(createChatBotMessage, setState, 'Мы предоставляем широкий спектр услуг по ремонту интерьеров, включая покраску стен, укладку полов, установку мебели и многое другое. Расскажите нам, что вас интересует, и мы с радостью поможем вам с вашим проектом!');
    const handlePortfolio = () => sendMessage(createChatBotMessage, setState, 'У нас есть много успешных проектов в нашем портфолио.Можете посмотреть его на нашем сайте в разделе "Примеры работ".');
    const handlePricing = () => sendMessage(createChatBotMessage, setState, 'Для получения информации о ценах на наши услуги, пожалуйста, свяжитесь с нами по указанным контактам.');
    const handleAppointment = () => sendMessage(createChatBotMessage, setState, 'Для записи на прием, пожалуйста, свяжитесь с нами по указанным контактам или заполните форму на нашем сайте.');

    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<{ actions: Actions }>, {
                        actions: {
                            handleHello,
                            handleBye,
                            handleServices,
                            handlePortfolio,
                            handlePricing,
                            handleAppointment,
                        },
                    });
                }
                return child;
            })}
        </>
    );
};

export default ActionProvider;
