import {feedbackSchema} from '../schema';

describe('feedbackSchema', () => {
    it('accepts valid payload', () => {
        const payload = {
            name: 'Иван Иванов',
            phone: '+375 (29) 123-45-67',
            email: 'test@example.com',
            message: 'Нужен расчет сметы и дизайн-проект.',
            consent: true,
        };

        const result = feedbackSchema.safeParse(payload);
        expect(result.success).toBe(true);
    });

    it('rejects payload without consent', () => {
        const payload = {
            name: 'Иван Иванов',
            phone: '+375291234567',
            email: 'test@example.com',
            message: 'Сообщение для проверки.',
            consent: false,
        };

        const result = feedbackSchema.safeParse(payload);
        expect(result.success).toBe(false);
    });

    it('rejects payload with invalid phone', () => {
        const payload = {
            name: 'Иван Иванов',
            phone: 'invalid-phone',
            email: 'test@example.com',
            message: 'Сообщение для проверки.',
            consent: true,
        };

        const result = feedbackSchema.safeParse(payload);
        expect(result.success).toBe(false);
    });
});
