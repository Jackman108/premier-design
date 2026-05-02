import { FeedbackPhoneCountry } from '@shared/ui/order/interface/FeedbackForm.types';

export const getPhoneMask = (country: FeedbackPhoneCountry): string =>
	country === 'ru' ? '+7 (###) ###-##-##' : '+375 (##) ###-##-##';

export const toPhoneWithCountryCode = (country: FeedbackPhoneCountry, digits: string): string => {
	const countryCode = country === 'ru' ? '+7' : '+375';
	return `${countryCode}${digits}`;
};

export const stripPhoneCountryCode = (phone: string): string => phone.replace(/^\+375|^\+7/, '');

export const normalizePhoneDigits = (phone: string): string => phone.replace(/\D/g, '');
