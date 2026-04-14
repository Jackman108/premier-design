import {FeedbackItem} from "../interface/FeedbackModal.props";
import {submitFeedback} from "../features/feedback/useCases/submitFeedback";

export const processFeedback = async (data: FeedbackItem) => {
    return submitFeedback(data);
};
