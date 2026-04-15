import {z} from 'zod';

const phonePattern = /^[+\d\s()-]{7,20}$/;

export const feedbackSchema = z.object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters').max(120),
    phone: z.string().trim().regex(phonePattern, 'Phone has invalid format'),
    email: z.string().trim().email('Email has invalid format').optional().or(z.literal('')),
    message: z.string().trim().min(5, 'Message must contain at least 5 characters').max(2000),
    consent: z.boolean().refine((value) => value, {
        message: 'Consent is required',
    }),
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
