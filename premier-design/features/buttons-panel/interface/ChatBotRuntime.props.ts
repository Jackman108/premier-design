import type {IMessage} from 'react-chatbot-kit/build/src/interfaces/IMessages';

export interface ChatBotRuntimeProps {
	messageHistory: IMessage[];
	saveMessages: (messages: IMessage[]) => void;
}
