import { isValidByOrRuMobilePhone } from '@shared/validates/byRuPhone';

describe('isValidByOrRuMobilePhone', () => {
	it('accepts BY +375 with operators 25, 29, 33, 44', () => {
		expect(isValidByOrRuMobilePhone('+375 (29) 123-45-67')).toBe(true);
		expect(isValidByOrRuMobilePhone('375251234567')).toBe(true);
		expect(isValidByOrRuMobilePhone('+375331234567')).toBe(true);
		expect(isValidByOrRuMobilePhone('+375441234567')).toBe(true);
	});

	it('rejects BY +375 with disallowed operator code', () => {
		expect(isValidByOrRuMobilePhone('+375 (17) 123-45-67')).toBe(false);
	});

	it('accepts RU +7 with valid 9XX in numbering plan', () => {
		expect(isValidByOrRuMobilePhone('+7 (903) 123-45-67')).toBe(true);
		expect(isValidByOrRuMobilePhone('79161234567')).toBe(true);
		expect(isValidByOrRuMobilePhone('+7 977 000-00-00')).toBe(true);
	});

	it('rejects RU when second digit is not 9 (e.g. landline / other region)', () => {
		expect(isValidByOrRuMobilePhone('+7 (495) 123-45-67')).toBe(false);
	});

	it('rejects known non-mobile 9XX (e.g. 954)', () => {
		expect(isValidByOrRuMobilePhone('+7 (954) 000-00-00')).toBe(false);
	});

	it('maps 8→7 for RU and 80→375 for BY', () => {
		expect(isValidByOrRuMobilePhone('89161234567')).toBe(true);
		expect(isValidByOrRuMobilePhone('80 (29) 123-45-67')).toBe(true);
	});
});
