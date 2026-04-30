/**
 * Мобильные коды BY (+375): двузначный DEF после 375.
 * @see https://en.wikipedia.org/wiki/Telephone_numbers_in_Belarus
 */
const BY_OPERATOR_2 = new Set(['25', '29', '33', '44']);

/**
 * Мобильные DEF РФ: трёхзначный 9XX после ведущей 9 (план нумерации, без MNP).
 * Диапазоны: 900–953, 955–969, 972–999; 954 — не мобильный пучок (часто спутник).
 */
const isValidRuMobile9xx = (triple: string): boolean => {
	const n = Number.parseInt(triple, 10);
	if (Number.isNaN(n) || n < 900 || n > 999) {
		return false;
	}
	if (n === 954) {
		return false;
	}
	if (n >= 900 && n <= 953) {
		return true;
	}
	if (n >= 955 && n <= 969) {
		return true;
	}
	if (n === 970 || n === 971) {
		return false;
	}
	return n >= 972 && n <= 999;
};

const onlyDigits = (s: string): string => s.replace(/\D/g, '');

/**
 * true, если мобильный +375 (оператор 25/29/33/44) или +7 (9XX в допустимом плане).
 * Поддержка: 8 9… → 7 9…, BY 80… → 375…, 10 цифр 9… без кода страны (РФ).
 */
export const isValidByOrRuMobilePhone = (phone: string): boolean => {
	let d = onlyDigits(phone);
	if (d.length === 0) {
		return false;
	}

	if (d.length === 11 && d[0] === '8' && d[1] === '9') {
		d = `7${d.slice(1)}`;
	}

	if (d.length === 11 && d.startsWith('80')) {
		d = `375${d.slice(2)}`;
	}

	if (d.length === 12 && d.startsWith('375')) {
		const op2 = d.slice(3, 5);
		const rest7 = d.slice(5, 12);
		return BY_OPERATOR_2.has(op2) && /^\d{7}$/.test(rest7);
	}

	if (d.length === 11 && d[0] === '7' && d[1] === '9') {
		const pfx3 = d.slice(1, 4);
		return isValidRuMobile9xx(pfx3);
	}

	if (d.length === 10 && d[0] === '9') {
		return isValidRuMobile9xx(d.slice(0, 3));
	}

	return false;
};
