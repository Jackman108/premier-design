import { FeedbackItem } from "../FeedbackForm/FeedbackForm.props";

export interface CalculatorModalProps {
    onClose: () => void;
    onSubmit?: (data: FeedbackItem) => Promise<void>;
}
