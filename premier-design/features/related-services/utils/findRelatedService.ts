import {RelatedServiceCardProps} from "@features/related-services/interface/RelatedService.props";
import {getServiceIdFromCanonical} from "../../services/utils/findService";
import {DataProps} from "@widgets/interface/interfaceData";

export const findRelatedService = (data: DataProps, categoryId: string): RelatedServiceCardProps | null => {
    const relatedService = data.relatedServices.find(
        (service) => getServiceIdFromCanonical(service.canonical) === categoryId
    );

    if (!relatedService) {
        console.error(`Related service with id ${categoryId} not found`);
        return null;
    }

    return relatedService;
};