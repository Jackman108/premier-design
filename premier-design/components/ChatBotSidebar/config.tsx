'use client'
import {createChatBotMessage} from 'react-chatbot-kit';
import Phone from '../UX/Phone/Phone';
import CustomAvatar from './CustomAvatar';
import {CustomAvatarProps} from '../../interface/ChatBot.props';

const botName = 'Алина';
const botAvatarPath = '/botAvatars/botAvatar.webp';
const userAvatarPath = '/botAvatars/userAvatar.webp';
const config = {
    botName: botName,
    lang: 'no',
    initialMessages: [
        createChatBotMessage(
            `Привет, я ${botName}. Буду рада тебе помочь!`,
            {delay: 0},
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
            widgetFunc: () => <Phone/>,
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
    customComponents: {
        header: () => <div style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
            backgroundColor: "#786B64",
            padding: "5px",
            borderRadius: "3px"
        }}>Ваш консультант {botName}</div>,
        botAvatar: (props: CustomAvatarProps) => (
            <CustomAvatar {...props} src={botAvatarPath} alt="Bot Avatar"/>
        ),
        userAvatar: (props: CustomAvatarProps) => (
            <CustomAvatar {...props} src={userAvatarPath} alt="User Avatar"/>
        ),
    },
};

export default config;
