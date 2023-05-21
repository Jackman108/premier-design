import { FeedbackItem } from "../FeedbackForm/FeedbackForm.props";

export interface ModalOverlayProps {
    onClose: () => void;
    onSubmit: (data: FeedbackItem) => Promise<void>;
}
