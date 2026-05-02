import en from '../../../data/locales/en/ui.json';
import ru from '../../../data/locales/ru/ui.json';
import { UI } from '../ui-message-keys';

describe('ui messages contract', () => {
	it('every typed UI key exists in ru and en JSON', () => {
		for (const key of Object.values(UI)) {
			// Keys use dot notation (e.g. menu.mobileNavAriaLabel); Jest's toHaveProperty
			// interprets dots as nested paths, so assert flat ownership explicitly.
			expect(Object.prototype.hasOwnProperty.call(ru, key)).toBe(true);
			expect(Object.prototype.hasOwnProperty.call(en, key)).toBe(true);
			expect(typeof (ru as Record<string, string>)[key]).toBe('string');
			expect(typeof (en as Record<string, string>)[key]).toBe('string');
		}
	});
});
