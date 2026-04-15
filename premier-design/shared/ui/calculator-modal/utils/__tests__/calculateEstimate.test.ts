import {calculateEstimate, DEFAULT_TAB_COSTS, parseAreaValue} from '@shared/ui/calculator-modal/utils/calculateEstimate';

describe('calculator estimate utils', () => {
    it('parses area value as integer', () => {
        expect(parseAreaValue('42')).toBe(42);
    });

    it('calculates rounded estimate with known factors', () => {
        const result = calculateEstimate({
            tabCosts: DEFAULT_TAB_COSTS,
            selectedTab: 2,
            area: 50,
            propertyType: 'secondary',
            repairType: 'comfort',
            serviceType: 'design_repair',
        });

        // 319 * 50 * 1.1 * 1.5 * 1.2 = 31581
        expect(result).toBe(31581);
    });

    it('returns 0 when selected tab is out of range', () => {
        const result = calculateEstimate({
            tabCosts: DEFAULT_TAB_COSTS,
            selectedTab: 99,
            area: 50,
            propertyType: 'secondary',
            repairType: 'comfort',
            serviceType: 'design_repair',
        });

        expect(result).toBe(0);
    });
});
