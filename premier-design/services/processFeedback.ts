import type {FeedbackItem} from '@shared/ui/order/interface/FeedbackModal.props';
import {submitFeedback} from '../features/feedback/useCases/submitFeedback';

export const processFeedback = async (data: FeedbackItem) => {
    return submitFeedback(data);
};
