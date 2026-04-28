import type {CostingCardProps} from '@shared/interface/CostingCard.props';
import {
    mapCostingCardsToObjectTypeItems,
    objectTypeTitleBySelectedTab,
    optionLabelByValue,
} from '@shared/ui/estimate-modal/utils/estimateSelectOptions';

describe('estimateSelectOptions', () => {
    it('resolves option label by value', () => {
        const items = [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
        ];
        expect(optionLabelByValue(items, 'b')).toBe('B');
        expect(optionLabelByValue(items, 'x')).toBe('');
    });

    it('maps costing cards to collapsible options by id', () => {
        const cards: CostingCardProps[] = [
            { id: 1, title: 'Квартира', image: '/1.webp' },
            { id: 2, title: 'Дом', image: '/2.webp' },
        ];
        expect(mapCostingCardsToObjectTypeItems(cards)).toEqual([
            { value: '1', label: 'Квартира' },
            { value: '2', label: 'Дом' },
        ]);
    });

    it('returns title for selected tab id', () => {
        const cards: CostingCardProps[] = [{ id: 2, title: 'Дом', image: '/2.webp' }];
        expect(objectTypeTitleBySelectedTab(cards, 2)).toBe('Дом');
        expect(objectTypeTitleBySelectedTab(cards, 9)).toBe('');
    });
});
