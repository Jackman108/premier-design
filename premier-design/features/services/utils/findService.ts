import {DataProps} from "@widgets/interface/interfaceData";
import {getCanonicalPath} from "@shared/utils/getCanonicalPath";

export const findService = (data: DataProps, categoryId: string, serviceId: string) => {
    if (!data?.prices?.repairs) {
        throw new Error('No repairs data found');
    }

    const category = data.prices.repairs.find((cat) => cat?.id === categoryId);
    if (!category) {
        throw new Error(`Category with id ${categoryId} not found`);
    }

    const service = category?.priceList?.find((item) => getCanonicalPath(item.canonical) === serviceId);
    if (!service) {
        throw new Error(`Service with id ${serviceId} not found`);
    }

    return {
        service,
        categoryProps: {
            title: category?.title || '',
            description: category?.description || '',
            image: category?.image || '',
        },
    };
};
