import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { feedbackSchema, PHONE_BY_RU_OPERATOR_ERROR, PHONE_FORMAT_ERROR } from '@shared/validates/feedbackSchema';
import { FeedbackFormErrors, FeedbackPhoneCountry } from '@shared/ui/order/interface/FeedbackForm.types';
import { FeedbackFormProps, FeedbackItem } from '@shared/ui/order/interface/FeedbackModal.props';
import {
	getPhoneMask,
	normalizePhoneDigits,
	stripPhoneCountryCode,
	toPhoneWithCountryCode,
} from '@shared/ui/order/utils/phoneFormatting';
import { z } from 'zod';

const mapUiError = (field: keyof FeedbackFormErrors, message?: string): string => {
	if (!message) {
		return '';
	}

	switch (field) {
		case 'name':
			return 'Введите ваше имя';
		case 'phone': {
			if (message === PHONE_BY_RU_OPERATOR_ERROR) {
				return 'Мобильный +375: код 25, 29, 33 или 44. Мобильный +7: допустимый префикс 9XX (РФ).';
			}
			if (message === PHONE_FORMAT_ERROR) {
				return 'Введите ваш номер телефона';
			}
			return 'Введите ваш номер телефона';
		}
		case 'message':
			return 'Введите сообщение';
		case 'consent':
			return 'Необходимо согласие с пользовательским соглашением';
		case 'email':
			return message.includes('Email has invalid format') ? 'Неверный формат email.' : message;
		default:
			return message;
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

export const useFeedbackForm = ({ onSubmit, initialMessage }: FeedbackFormProps) => {
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
				name: mapUiError('name', getTreeErrorMessage(treeErrors, 'name')),
				phone: mapUiError('phone', getTreeErrorMessage(treeErrors, 'phone')),
				email: mapUiError('email', getTreeErrorMessage(treeErrors, 'email')),
				message: mapUiError('message', getTreeErrorMessage(treeErrors, 'message')),
				consent: mapUiError('consent', getTreeErrorMessage(treeErrors, 'consent')),
			};
			setErrors(nextErrors);
			return;
		}

		// Защита от двойного submit: пока запрос в полёте, повторный клик игнорируется.
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
