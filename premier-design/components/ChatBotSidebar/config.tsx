'use client'
import { createChatBotMessage } from 'react-chatbot-kit';
import Phone from '../UX/Phone/Phone';
import SocialIcons from '../UX/SocialIcons/SocialIcons';

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
            `Для получения подробной информации можешь нам позвонить, написать в соц. сети или заполнить форму и Мы тебе скоро перезвоним!`,
            {
                delay: 2000,
                widget: 'Phone',              
            },
        ),
    ],
    widgets: [
        {
            widgetName: 'Phone',
            widgetFunc: () => <Phone />,
            mapStateToProps: ['gist'],
            props: {}
        },
        {
            widgetName: 'Social',
            widgetFunc: () => <SocialIcons />,
            mapStateToProps: ['gist'],
            props: {}
        },
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
