import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { UI, type UiMessageKey } from '@shared/i18n/ui-message-keys';
import { getUiMessage } from '@shared/i18n/ui-messages';
import type { SiteLocale } from '@shared/site-data/site-locale';
import { FeedbackFormErrors, FeedbackPhoneCountry } from '@shared/ui/order/interface/FeedbackForm.types';
import { FeedbackFormProps, FeedbackItem } from '@shared/ui/order/interface/FeedbackModal.props';
import {
	getPhoneMask,
	normalizePhoneDigits,
	stripPhoneCountryCode,
	toPhoneWithCountryCode,
} from '@shared/ui/order/utils/phoneFormatting';
import { feedbackSchema, PHONE_BY_RU_OPERATOR_ERROR, PHONE_FORMAT_ERROR } from '@shared/validates/feedbackSchema';
import { z } from 'zod';

const mapZodFieldError = (locale: SiteLocale, field: keyof FeedbackFormErrors, zodMsg?: string): string => {
	const m = (key: UiMessageKey) => getUiMessage(locale, key);
	switch (field) {
		case 'name':
			return m(UI.feedbackValidationNameRequired);
		case 'phone': {
			if (zodMsg === PHONE_BY_RU_OPERATOR_ERROR) {
				return m(UI.feedbackValidationPhoneOperatorRules);
			}
			if (zodMsg === PHONE_FORMAT_ERROR) {
				return m(UI.feedbackValidationPhoneRequired);
			}
			return m(UI.feedbackValidationPhoneRequired);
		}
		case 'message':
			return m(UI.feedbackValidationMessageRequired);
		case 'consent':
			return m(UI.feedbackValidationConsentRequired);
		case 'email':
			return zodMsg ? m(UI.feedbackValidationEmailInvalid) : '';
		default:
			return zodMsg ?? '';
	}
};

const INITIAL_FORM_DATA: FeedbackItem = {
	name: '',
	phone: '',
	email: '',
	message: '',
	consent: false,
};

const INITIAL_ERRORS: FeedbackFormErrors = {
	name: '',
	phone: '',
	email: '',
	message: '',
	consent: '',
};

type TreeifiedZodErrorNode = {
	errors?: string[];
	properties?: Record<string, TreeifiedZodErrorNode>;
};

const getTreeErrorMessage = (
	tree: ReturnType<typeof z.treeifyError>,
	field: keyof FeedbackFormErrors,
): string | undefined => {
	const typedTree = tree as TreeifiedZodErrorNode;
	const fieldNode = typedTree.properties?.[field];
	return fieldNode?.errors?.[0];
};

export type UseFeedbackFormArgs = FeedbackFormProps & { locale: SiteLocale };

export const useFeedbackForm = ({ onSubmit, initialMessage, locale }: UseFeedbackFormArgs) => {
	const [formDataState, setFormDataState] = useState<FeedbackItem>({
		...INITIAL_FORM_DATA,
		message: initialMessage ?? '',
	});
	const [country, setCountry] = useState<FeedbackPhoneCountry>('by');
	const [isConsentGiven, setIsConsentGiven] = useState(false);
	const [errors, setErrors] = useState<FeedbackFormErrors>(INITIAL_ERRORS);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setFormDataState((prev) => ({ ...prev, [name]: value }));
		setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
	};

	const handlePhoneChange = (values: { value: string }) => {
		const formattedPhone = toPhoneWithCountryCode(country, values.value);
		setFormDataState((prev) => ({ ...prev, phone: formattedPhone }));
		setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
	};

	const handleConsentChange = () => {
		setIsConsentGiven((prev) => !prev);
	};

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitting) {
			return;
		}
		const validationResult = feedbackSchema.safeParse({
			...formDataState,
			consent: isConsentGiven,
		});
		if (!validationResult.success) {
			const treeErrors = z.treeifyError(validationResult.error);
			const nextErrors: FeedbackFormErrors = {
				name: mapZodFieldError(locale, 'name', getTreeErrorMessage(treeErrors, 'name')),
				phone: mapZodFieldError(locale, 'phone', getTreeErrorMessage(treeErrors, 'phone')),
				email: mapZodFieldError(locale, 'email', getTreeErrorMessage(treeErrors, 'email')),
				message: mapZodFieldError(locale, 'message', getTreeErrorMessage(treeErrors, 'message')),
				consent: mapZodFieldError(locale, 'consent', getTreeErrorMessage(treeErrors, 'consent')),
			};
			setErrors(nextErrors);
			return;
		}

		setIsSubmitting(true);
		try {
			await onSubmit({
				...formDataState,
				phone: normalizePhoneDigits(formDataState.phone),
				consent: isConsentGiven,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		country,
		errors,
		formDataState,
		isConsentGiven,
		phoneMask: getPhoneMask(country),
		displayedPhone: stripPhoneCountryCode(formDataState.phone),
		isSubmitting,
		setCountry,
		handleInputChange,
		handlePhoneChange,
		handleConsentChange,
		handleSubmit,
	};
};
