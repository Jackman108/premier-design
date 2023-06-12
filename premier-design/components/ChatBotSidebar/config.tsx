'use client'
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Алина';

const config = {
    botName: botName,
    lang: 'no',
    initialMessages: [
        createChatBotMessage(
            `Привет, я ${botName}. Буду рада тебе помочь?`,
            { delay: 0 },
        ),
        createChatBotMessage(
            `Для получения подробной информации можешь позвонить по номеру, написать в соц. сети или заполнить форму. Мы тебе скоро перезвоним!`,
            { delay: 1000 },
        ),
    ],

    state: {
        gist: '',
        infoBox: '',
    },
    customStyles: {
        botMessageBox: {
            backgroundColor: '#786B64',
        },
        chatButton: {
            backgroundColor: '#786B64',
        },
        botAvatar: {
            backgroundColor: "#786B64",
        },
    },
};

export default config;
