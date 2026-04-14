import {DataProps} from "@widgets/interface/interfaceData";
import {getCanonicalPath} from "@shared/utils/getCanonicalPath";

export const findRelatedService = (data: DataProps, categoryId: string) => {
    if (!data.relatedServices) {
        throw new Error('No related services data found');
    }

    const relatedService = data.relatedServices.find(service => getCanonicalPath(service.canonical) === categoryId);
    if (!relatedService) {
        throw new Error(`Service with id ${relatedService} not found`);
    }

    return {relatedService}
};