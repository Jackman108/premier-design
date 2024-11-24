export type PropertyType = 'new' | 'secondary';
export type RepairType = 'standard' | 'comfort' | 'business';
export type ServiceType = 'design_repair' | 'repair' | 'design';


export const typeItemsConfig = {
    repairTypeItems: [
        { label: 'Стандартный ремонт', value: 'standard' },
        { label: 'Комфортный ремонт', value: 'comfort' },
        { label: 'Бизнес ремонт', value: 'business' },
    ],
    propertyTypeItems: [
        { label: 'Новое жилье', value: 'new' },
        { label: 'Вторичное жилье', value: 'secondary' },
    ],
    serviceTypeItems: [
        { label: 'Дизайн & Ремонт', value: 'design_repair' },
        { label: 'Ремонт', value: 'repair' },
        { label: 'Дизайн', value: 'design' },
    ],
};

export const factorConfig = {
    repairFactorMap: {
        standard: 1,
        comfort: 1.5,
        business: 2.1,
    } as Record<RepairType, number>,
    serviceFactorMap: {
        design_repair: 1.2,
        repair: 1,
        design: 0.2,
    } as Record<ServiceType, number>,
    propertyFactorMap: {
        new: 1,
        secondary: 1.1,
    } as Record<PropertyType, number>,
};