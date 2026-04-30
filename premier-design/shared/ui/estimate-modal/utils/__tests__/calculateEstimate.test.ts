import { BASE_COST_PER_SQM_BY_CARD_ID } from '@shared/ui/estimate-modal/configs/factorsConfig';
import { calculateEstimate, parseAreaValue } from '@shared/ui/estimate-modal/utils/calculateEstimate';

describe('estimate utils', () => {
	it('parses area value as integer', () => {
		expect(parseAreaValue('42')).toBe(42);
	});

	it('returns 0 for empty or non-numeric area to avoid NaN in estimate', () => {
		expect(parseAreaValue('')).toBe(0);
		expect(parseAreaValue('abc')).toBe(0);
	});

	it('calculates rounded estimate with known factors', () => {
		const result = calculateEstimate({
			tabCosts: BASE_COST_PER_SQM_BY_CARD_ID,
			selectedTab: 2,
			area: 50,
			propertyType: 'secondary',
			repairType: 'comfort',
			serviceType: 'design_repair',
		});

		// 319 (вкладка id=2 «дом») * 50 * 1.1 * 1.5 * 1.2
		expect(result).toBe(31581);
	});

	it('returns 0 when selected tab is out of range', () => {
		const result = calculateEstimate({
			tabCosts: BASE_COST_PER_SQM_BY_CARD_ID,
			selectedTab: 99,
			area: 50,
			propertyType: 'secondary',
			repairType: 'comfort',
			serviceType: 'design_repair',
		});

		expect(result).toBe(0);
	});
});
