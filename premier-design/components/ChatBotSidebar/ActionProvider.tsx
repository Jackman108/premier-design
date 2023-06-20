'use client'
import React, { FC, ReactElement } from 'react';
import { ActionProviderProps, ChatState } from '../../interface/ChatBot.props';

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
    const handleServices = () => {
        const botMessage = createChatBotMessage('Мы предоставляем широкий спектр услуг по ремонту интерьеров, включая покраску стен, укладку полов, установку мебели и многое другое. Расскажите нам, что вас интересует, и мы с радостью поможем вам с вашим проектом!');
        setState((prev: ChatState) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handlePortfolio = () => {
        const botMessage = createChatBotMessage('У нас есть много успешных проектов в нашем портфолио. Можете посмотреть его на нашем сайте в разделе "Примеры работ".');
        setState((prev: ChatState) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handlePricing = () => {
        const botMessage = createChatBotMessage('Для получения информации о ценах на наши услуги, пожалуйста, свяжитесь с нами по указанным контактам.');
        setState((prev: ChatState) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleAppointment = () => {
        const botMessage = createChatBotMessage('Для записи на прием, пожалуйста, свяжитесь с нами по указанным контактам или заполните форму на нашем сайте.');
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
                        handleServices,
                        handlePortfolio,
                        handlePricing,
                        handleAppointment,
                    },
                });
            })}
        </>
    );
};

export default ActionProvider;
