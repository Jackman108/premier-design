import type { FeedbackItem } from '@shared/ui/order/interface/FeedbackModal.props';
import { feedbackFormValidationMessages as t } from '@shared/i18n/messages/feedback-form';

import { validateEmail } from './validateEmail';
import { validatePhone } from './validatePhone';

export const validateForm = (formDataState: FeedbackItem, isConsentGiven: boolean) => ({
	name: formDataState.name ? '' : t.nameRequired,
	phone: formDataState.phone
		? validatePhone(formDataState.phone)
			? ''
			: t.phoneInvalid
		: t.phoneRequired,
	email: formDataState.email && !validateEmail(formDataState.email) ? t.emailInvalid : '',
	message: formDataState.message ? '' : t.messageRequired,
	consent: isConsentGiven ? '' : t.consentRequired,
});
