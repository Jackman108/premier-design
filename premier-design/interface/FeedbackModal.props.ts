import { ChangeEvent } from "react";
export interface FeedbackItem {
    name: string;
    phone: string;
    email: string;
    message: string;
}
export interface FeedbackFormProps {
    onSubmit: (data: FeedbackItem) => Promise<void>;
    onInputChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    formDataState: FeedbackItem;
}
export interface FeedbackModalProps {
    onClose: () => void;
    onSubmit: (data: FeedbackItem) => Promise<void>;
}
