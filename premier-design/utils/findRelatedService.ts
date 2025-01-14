import data from "../data/data.json";
import {RelatedServiceCardProps} from "../interface/Cards.props";

const getServiceIdFromCanonical = (canonical: string): string => {
    return canonical.split('/').pop() || '';
};

export const findRelatedService = (categoryId: string): RelatedServiceCardProps | null => {
    const relatedService = data.relatedServices.find(
        (service) => getServiceIdFromCanonical(service.canonical) === categoryId
    );

    if (!relatedService) {
        console.error(`Related service with id ${categoryId} not found`);
        return null;
    }

    return relatedService;
};