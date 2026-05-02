import { factorConfig, PropertyType, RepairType, ServiceType } from '@shared/ui/estimate-modal/configs/factorsConfig';

export interface CalculateEstimateParams {
	/** Берётся из `BASE_COST_PER_SQM_BY_CARD_ID` в `configs/factorsConfig` — единый конфиг. */
	tabCosts: readonly number[];
	/** Совпадает с `id` карточки в смете — `tabCosts[selectedTab]` даёт базу за м² под тип объекта. */
	selectedTab: number;
	area: number;
	propertyType: string;
	repairType: string;
	serviceType: string;
}

/** Площадь в м² для расчёта: нечисловой ввод → 0, чтобы не получить NaN в `calculateEstimate`. */
export const parseAreaValue = (value: string): number => {
	const n = Number.parseInt(value, 10);
	return Number.isNaN(n) || n < 0 ? 0 : n;
};

export const calculateEstimate = ({
	tabCosts,
	selectedTab,
	area,
	propertyType,
	repairType,
	serviceType,
}: CalculateEstimateParams): number => {
	const baseCost = tabCosts[selectedTab] ?? 0;
	const serviceFactor = factorConfig.serviceFactorMap[serviceType as ServiceType] ?? 1;
	const propertyFactor = factorConfig.propertyFactorMap[propertyType as PropertyType] ?? 1;
	const repairFactor = factorConfig.repairFactorMap[repairType as RepairType] ?? 1;

	const totalCost = baseCost * area * serviceFactor * propertyFactor * repairFactor;
	return Math.round(totalCost);
};
