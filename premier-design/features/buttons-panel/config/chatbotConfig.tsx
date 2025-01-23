'use client'
import {createChatBotMessage} from 'react-chatbot-kit';
import Phone from '@shared/ui/phone/Phone';
import CustomAvatar from '@features/buttons-panel/ui/CustomAvatar/CustomAvatar';
import {CustomAvatarProps} from '@features/buttons-panel/interface/ChatBot.props';

const BOT_NAME = 'Алина';
const BOT_AVATAR_PATH = '/botAvatars/botAvatar.webp';
const USER_AVATAR_PATH = '/botAvatars/userAvatar.webp';

const GREETING_MESSAGE = `Привет, я ${BOT_NAME}. Буду рада тебе помочь!`;
const INFO_MESSAGE = `Для получения подробной информации можешь нам позвонить, написать в соц. сети или заполнить форму, и Мы тебе скоро перезвоним!`;


const chatbotConfig = {
    botName: BOT_NAME,
    lang: 'ru',
    initialMessages: [
        createChatBotMessage(GREETING_MESSAGE, {delay: 0}),
        createChatBotMessage(INFO_MESSAGE, {delay: 2000, widget: 'Phone'},
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
        }}>Ваш консультант {BOT_NAME}</div>,
        botAvatar: (props: CustomAvatarProps) => (
            <CustomAvatar {...props} src={BOT_AVATAR_PATH} alt="Bot Avatar"/>
        ),
        userAvatar: (props: CustomAvatarProps) => (
            <CustomAvatar {...props} src={USER_AVATAR_PATH} alt="User Avatar"/>
        ),
    },
};

export default chatbotConfig;
