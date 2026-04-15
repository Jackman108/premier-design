import {ChangeEvent, FormEvent, useState} from 'react';
import {FeedbackFormProps, FeedbackItem} from '@shared/ui/order/interface/FeedbackModal.props';
import {FeedbackFormErrors, FeedbackPhoneCountry} from '@shared/ui/order/interface/FeedbackForm.types';
import {getPhoneMask, normalizePhoneDigits, stripPhoneCountryCode, toPhoneWithCountryCode} from '@shared/ui/order/utils/phoneFormatting';
import {feedbackSchema} from '@shared/validates/feedbackSchema';

const mapUiError = (field: keyof FeedbackFormErrors, message?: string): string => {
    if (!message) {
        return '';
    }

    switch (field) {
        case 'name':
            return 'Введите ваше имя';
        case 'phone':
            return 'Введите ваш номер телефона';
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

export const useFeedbackForm = ({onSubmit}: FeedbackFormProps) => {
    const [formDataState, setFormDataState] = useState<FeedbackItem>(INITIAL_FORM_DATA);
    const [country, setCountry] = useState<FeedbackPhoneCountry>('by');
    const [isConsentGiven, setIsConsentGiven] = useState(false);
    const [errors, setErrors] = useState<FeedbackFormErrors>(INITIAL_ERRORS);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setFormDataState((prev) => ({...prev, [name]: value}));
        setErrors((prevErrors) => ({...prevErrors, [name]: ''}));
    };

    const handlePhoneChange = (values: { value: string }) => {
        const formattedPhone = toPhoneWithCountryCode(country, values.value);
        setFormDataState((prev) => ({...prev, phone: formattedPhone}));
        setErrors((prevErrors) => ({...prevErrors, phone: ''}));
    };

    const handleConsentChange = () => {
        setIsConsentGiven((prev) => !prev);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationResult = feedbackSchema.safeParse({
            ...formDataState,
            consent: isConsentGiven,
        });
        if (!validationResult.success) {
            const fieldErrors = validationResult.error.flatten().fieldErrors;
            const nextErrors: FeedbackFormErrors = {
                name: mapUiError('name', fieldErrors.name?.[0]),
                phone: mapUiError('phone', fieldErrors.phone?.[0]),
                email: mapUiError('email', fieldErrors.email?.[0]),
                message: mapUiError('message', fieldErrors.message?.[0]),
                consent: mapUiError('consent', fieldErrors.consent?.[0]),
            };
            setErrors(nextErrors);
            return;
        }

        onSubmit({
            ...formDataState,
            phone: normalizePhoneDigits(formDataState.phone),
            consent: isConsentGiven,
        });
    };

    return {
        country,
        errors,
        formDataState,
        isConsentGiven,
        phoneMask: getPhoneMask(country),
        displayedPhone: stripPhoneCountryCode(formDataState.phone),
        setCountry,
        handleInputChange,
        handlePhoneChange,
        handleConsentChange,
        handleSubmit,
    };
};
