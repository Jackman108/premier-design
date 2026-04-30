/**
 * Единый источник правды для калькулятора сметы: база (бел. руб. за м²) по `id` карточки
 * и коэффициенты. Подписи вариантов в UI — `typeItemsConfig`; при смене прайса правьте числа здесь.
 */

export type PropertyType = 'new' | 'secondary';
export type RepairType = 'standard' | 'comfort' | 'business';
export type ServiceType = 'design_repair' | 'repair' | 'design';

/**
 * База за м²: индекс = `id` из `costingCard` (0 — резерв, 1…5 — квартира, дом, магазин, ресторан, офис).
 * Должна совпадать по смыслу с порядком карточек в `data.json` / `ModalTabs` замене.
 */
export const BASE_COST_PER_SQM_BY_CARD_ID: readonly number[] = [0, 289, 319, 379, 409, 379];

export const typeItemsConfig = {
	serviceTypeItems: [
		{ label: 'Дизайн & Ремонт', value: 'design_repair' },
		{ label: 'Ремонт', value: 'repair' },
		{ label: 'Дизайн', value: 'design' },
	],
	propertyTypeItems: [
		{ label: 'Новое жилье', value: 'new' },
		{ label: 'Вторичное жилье', value: 'secondary' },
	],
	repairTypeItems: [
		{ label: 'Стандартный ремонт', value: 'standard' },
		{ label: 'Комфортный ремонт', value: 'comfort' },
		{ label: 'Бизнес ремонт', value: 'business' },
	],
};

export const factorConfig = {
	serviceFactorMap: {
		design_repair: 1.2,
		repair: 1,
		design: 0.2,
	} as Record<ServiceType, number>,
	propertyFactorMap: {
		new: 1,
		secondary: 1.1,
	} as Record<PropertyType, number>,
	repairFactorMap: {
		standard: 1,
		comfort: 1.5,
		business: 2.1,
	} as Record<RepairType, number>,
} as const;
