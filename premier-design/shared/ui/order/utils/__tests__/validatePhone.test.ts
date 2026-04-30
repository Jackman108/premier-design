import { validatePhone } from '../validatePhone';

describe('validatePhone', () => {
	it('accepts valid RU phone', () => {
		expect(validatePhone('+7 (999) 123-45-67')).toBe(true);
	});

	it('accepts valid Belarus phone with 375 prefix', () => {
		expect(validatePhone('+375 (29) 123-45-67')).toBe(true);
	});

	it('accepts valid Belarus phone with 80 prefix', () => {
		expect(validatePhone('80 (29) 123-45-67')).toBe(true);
	});

	it('rejects invalid phone', () => {
		expect(validatePhone('12345')).toBe(false);
	});
});
