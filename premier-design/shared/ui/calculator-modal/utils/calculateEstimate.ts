import {factorConfig, PropertyType, RepairType, ServiceType} from '@shared/ui/calculator-modal/configs/factorsConfig';

export interface CalculateEstimateParams {
    tabCosts: number[];
    selectedTab: number;
    area: number;
    propertyType: string;
    repairType: string;
    serviceType: string;
}

export const DEFAULT_TAB_COSTS: number[] = [0, 289, 319, 379, 409, 379];

export const parseAreaValue = (value: string): number => Number.parseInt(value, 10);

export const calculateEstimate = ({
    tabCosts,
    selectedTab,
    area,
    propertyType,
    repairType,
    serviceType,
}: CalculateEstimateParams): number => {
    const baseCost = tabCosts[selectedTab] ?? 0;
    const propertyFactor = factorConfig.propertyFactorMap[propertyType as PropertyType] ?? 1;
    const repairFactor = factorConfig.repairFactorMap[repairType as RepairType] ?? 1;
    const serviceFactor = factorConfig.serviceFactorMap[serviceType as ServiceType] ?? 1;

    const totalCost = baseCost * area * propertyFactor * repairFactor * serviceFactor;
    return Math.round(totalCost);
};
