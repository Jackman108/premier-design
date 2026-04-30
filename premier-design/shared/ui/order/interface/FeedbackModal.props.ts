export interface FeedbackItem {
	name: string;
	phone: string;
	email?: string;
	message: string;
	consent: boolean;
}

export interface FeedbackFormProps {
	onSubmit: (data: FeedbackItem) => Promise<void>;
	initialMessage?: string;
}

export interface FeedbackModalProps {
	onClose: () => void;
	onSubmit: (data: FeedbackItem) => Promise<void>;
	initialMessage?: string;
}
