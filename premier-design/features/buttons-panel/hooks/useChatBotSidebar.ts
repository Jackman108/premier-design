import { useChatMessages } from '@features/buttons-panel/hooks/useChatMessages';
import { useModalState } from '@shared/hooks/useModalState';

/**
 * Не импортируем `chatbotConfig` (и тем более `react-chatbot-kit`) здесь —
 * иначе библиотека попадает в чанк `ChatBotSidebar` при первой загрузке панели.
 * Стартовые сообщения подставляет `ChatBotRuntime` при пустой истории.
 */
export const useChatBotSidebar = () => {
	const { isOpen: isBotOpen, toggleModal } = useModalState();
	const [messages, saveMessages] = useChatMessages();

	return {
		isBotOpen,
		toggleModal,
		messages,
		saveMessages,
		messageHistory: messages,
	};
};
