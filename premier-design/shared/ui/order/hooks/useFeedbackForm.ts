import {ChangeEvent, FormEvent, useState} from 'react';
import {FeedbackFormProps, FeedbackItem} from '@shared/ui/order/interface/FeedbackModal.props';
import {FeedbackFormErrors, FeedbackPhoneCountry} from '@shared/ui/order/interface/FeedbackForm.types';
import {validateForm} from '@shared/ui/order/utils/validateForm';
import {getPhoneMask, normalizePhoneDigits, stripPhoneCountryCode, toPhoneWithCountryCode} from '@shared/ui/order/utils/phoneFormatting';

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

        const formErrors = validateForm(formDataState, isConsentGiven);
        if (Object.values(formErrors).some((error) => error)) {
            setErrors(formErrors);
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
