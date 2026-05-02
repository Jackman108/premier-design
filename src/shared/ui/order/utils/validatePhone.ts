import { isValidByOrRuMobilePhone } from '@shared/validates/byRuPhone';

export const validatePhone = (phone: string) => isValidByOrRuMobilePhone(phone);
