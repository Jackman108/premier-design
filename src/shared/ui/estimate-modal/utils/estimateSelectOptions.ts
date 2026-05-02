/**
 * Подписи и пункты выбора для сметы: чистые функции без React (граница `utils/` → тонкий UI).
 * Вход: карточки `costing` и массивы из `factorsConfig.typeItemsConfig`.
 */
import type { CostingCardProps } from '@entities/costing';

export type SelectOption = { value: string; label: string };

export function optionLabelByValue(items: ReadonlyArray<{ value: string; label: string }>, value: string): string {
	return items.find((i) => i.value === value)?.label ?? '';
}

export function mapCostingCardsToObjectTypeItems(cards: ReadonlyArray<CostingCardProps>): SelectOption[] {
	return cards.map((c) => ({ value: String(c.id), label: c.title }));
}

export function objectTypeTitleBySelectedTab(cards: ReadonlyArray<CostingCardProps>, selectedTab: number): string {
	return cards.find((c) => c.id === selectedTab)?.title ?? '';
}
