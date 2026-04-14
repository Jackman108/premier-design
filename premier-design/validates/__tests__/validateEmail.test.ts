import {validateEmail} from '../../shared/ui/order/utils/validateEmail';

describe('validateEmail', () => {
    it('accepts valid email', () => {
        expect(validateEmail('ivan.petrov@test.by')).toBe(true);
    });

    it('rejects invalid email without domain', () => {
        expect(validateEmail('ivan.petrov@')).toBe(false);
    });

    it('rejects invalid email without at-sign', () => {
        expect(validateEmail('ivan.petrov.test.by')).toBe(false);
    });
});
