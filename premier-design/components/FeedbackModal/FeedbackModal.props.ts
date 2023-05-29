import { FeedbackItem } from "./FeedbackForm/FeedbackForm.props";

export interface FeedbackModalProps {
    onClose: () => void;
    onSubmit: (data: FeedbackItem) => Promise<void>;
}
