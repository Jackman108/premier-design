import { UI, type UiMessageKey } from '@shared/i18n/ui-message-keys';
import { getUiMessage } from '@shared/i18n/ui-messages';
import type { FeedbackItem } from '@shared/ui/order/interface/FeedbackModal.props';
import type { SiteLocale } from '@shared/site-data/site-locale';

import { validateEmail } from './validateEmail';
import { validatePhone } from './validatePhone';

export const validateForm = (formDataState: FeedbackItem, isConsentGiven: boolean, locale: SiteLocale = 'ru') => {
	const m = (key: UiMessageKey) => getUiMessage(locale, key);
	return {
		name: formDataState.name ? '' : m(UI.feedbackValidationNameRequired),
		phone: formDataState.phone
			? validatePhone(formDataState.phone)
				? ''
				: m(UI.feedbackValidationPhoneInvalid)
			: m(UI.feedbackValidationPhoneRequired),
		email: formDataState.email && !validateEmail(formDataState.email) ? m(UI.feedbackValidationEmailInvalid) : '',
		message: formDataState.message ? '' : m(UI.feedbackValidationMessageRequired),
		consent: isConsentGiven ? '' : m(UI.feedbackValidationConsentRequired),
	};
};
