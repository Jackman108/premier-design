import {z} from 'zod';

import {isValidByOrRuMobilePhone} from '@shared/validates/byRuPhone';

export const PHONE_FORMAT_ERROR = 'Phone has invalid format';
export const PHONE_BY_RU_OPERATOR_ERROR = 'PHONE_BY_RU_OPERATOR';

export const feedbackSchema = z.object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters').max(120),
    phone: z
        .string()
        .trim()
        .min(1, PHONE_FORMAT_ERROR)
        .refine((s) => isValidByOrRuMobilePhone(s), {message: PHONE_BY_RU_OPERATOR_ERROR}),
    email: z.string().trim().email('Email has invalid format').optional().or(z.literal('')),
    message: z.string().trim().min(5, 'Message must contain at least 5 characters').max(2000),
    consent: z.boolean().refine((value) => value, {
        message: 'Consent is required',
    }),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
