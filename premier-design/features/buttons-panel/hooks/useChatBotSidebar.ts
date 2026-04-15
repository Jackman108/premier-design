import chatbotConfig from '@features/buttons-panel/config/chatbotConfig';
import {useChatMessages} from '@features/buttons-panel/hooks/useChatMessages';
import {useModalState} from '@shared/hooks/useModalState';

export const useChatBotSidebar = () => {
    const {isOpen: isBotOpen, toggleModal} = useModalState();
    const [messages, saveMessages] = useChatMessages();

    return {
        isBotOpen,
        toggleModal,
        messages,
        saveMessages,
        messageHistory: messages.length > 0 ? messages : chatbotConfig.initialMessages,
    };
};
