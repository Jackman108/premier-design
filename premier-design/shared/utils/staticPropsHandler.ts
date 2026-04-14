import {GetStaticProps} from 'next';
import {getData} from "@pages/api/dataProvider";
import {getCommonProps} from "@shared/utils/getCommonProps";
import {findRelatedService} from "@features/related-services/utils/findRelatedService";
import {findService} from "@features/services/utils/findService";

export const staticPropsHandler = (isRelated = false): GetStaticProps => async ({params}) => {
    try {
        const data = await getData();
        if (!data) return {notFound: true};

        const {categoryId, serviceId} = params as { categoryId: string; serviceId?: string };

        const result = isRelated
            ? findRelatedService(data, categoryId)
            : findService(data, categoryId, serviceId || '');

        if (!result) return {notFound: true};

        return {
            props: {
                ...result,
                ...getCommonProps(data),
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error(error);
        return {notFound: true};
    }
};
