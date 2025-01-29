import {DataProps} from "@widgets/interface/interfaceData";

export const getServiceIdFromCanonical = (canonical: string): string => {
    return canonical.split('/').pop() || '';
};


export const findService = (data: DataProps, categoryId: string, serviceId: string) => {
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
