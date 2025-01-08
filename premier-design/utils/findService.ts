import data from "../data/data.json";

const getServiceIdFromCanonical = (canonical: string): string => {
    return canonical.split('/').pop() || '';
};

export const getFullCanonicalUrl = (canonical: string): string => {
    const baseUrl = "https://premium-interior.by";
    return `${baseUrl}${canonical}`;
};

export const findService = (categoryId: string, serviceId: string) => {
    const category = data.prices.repairs.find((category) => category.id === categoryId);

    if (!category) {
        console.error(`Category with id ${categoryId} not found`);
        return {service: null, categoryProps: null};
    }

    const service = category.priceList.find((item) => getServiceIdFromCanonical(item.canonical) === serviceId);
    if (!service) {
        console.error(`Service with id ${serviceId} not found`);
    }

    return {
        service,
        categoryProps: {
            title: category.title,
            description: category.description,
            image: category.image,
        },
    };
};
