/** @jest-environment node */
import dataEn from '../../../data/locales/en/data.json';
import data from '../../../data/locales/ru/data.json';
import { dataPropsSchema, formatDataPropsParseError } from '../dataPropsSchema';

describe('dataPropsSchema', () => {
	it('accepts production data/locales/ru/data.json', () => {
		const parsed = dataPropsSchema.safeParse(data);
		expect(parsed.success).toBe(true);
	});

	it('accepts production data/locales/en/data.json', () => {
		const parsed = dataPropsSchema.safeParse(dataEn);
		expect(parsed.success).toBe(true);
	});

	it('rejects missing top-level key with readable message', () => {
		const broken = { ...(data as Record<string, unknown>) };
		delete broken.menu;
		const parsed = dataPropsSchema.safeParse(broken);
		expect(parsed.success).toBe(false);
		if (!parsed.success) {
			const msg = formatDataPropsParseError(parsed.error);
			expect(msg).toMatch(/menu/i);
		}
	});

	it('rejects extra top-level key (.strict)', () => {
		const broken = { ...(data as Record<string, unknown>), typoKey: 1 };
		const parsed = dataPropsSchema.safeParse(broken);
		expect(parsed.success).toBe(false);
	});
});
