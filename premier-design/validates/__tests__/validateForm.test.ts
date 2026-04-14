import {validateForm} from '../validateForm';

describe('validateForm', () => {
    it('returns errors for missing required fields and consent', () => {
        const errors = validateForm(
            {
                name: '',
                phone: '',
                email: '',
                message: '',
                consent: false,
            },
            false
        );

        expect(errors.name).toBe('Введите ваше имя');
        expect(errors.phone).toBe('Введите ваш номер телефона');
        expect(errors.message).toBe('Введите сообщение');
        expect(errors.consent).toBe('Необходимо согласие с пользовательским соглашением');
    });

    it('returns errors for invalid phone and email formats', () => {
        const errors = validateForm(
            {
                name: 'Иван',
                phone: '+123',
                email: 'invalid-email',
                message: 'Тест',
                consent: true,
            },
            true
        );

        expect(errors.phone).toBe('Неверный формат номера телефона!');
        expect(errors.email).toBe('Неверный формат email.');
    });

    it('returns empty errors for valid form', () => {
        const errors = validateForm(
            {
                name: 'Иван Иванов',
                phone: '+375291234567',
                email: 'ivan@test.by',
                message: 'Нужна консультация',
                consent: true,
            },
            true
        );

        expect(errors).toEqual({
            name: '',
            phone: '',
            email: '',
            message: '',
            consent: '',
        });
    });
});
