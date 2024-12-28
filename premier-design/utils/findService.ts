import data from "../data/data.json";

const getServiceIdFromCanonical = (canonical: string): string => {
    return canonical.split('/').pop() || '';
};

export const findService = (categoryId: string, serviceId: string) => {
    const category = data.prices.repairs.find((category) => category.id === categoryId);
    if (!category) return {service: null, categoryDescription: ''};

    const service = category.priceList.find((item) => getServiceIdFromCanonical(item.canonical) === serviceId);

    return {service, categoryDescription: category.description};
};
