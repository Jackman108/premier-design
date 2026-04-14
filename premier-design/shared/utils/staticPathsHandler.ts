import {GetStaticPaths} from 'next';
import {getData} from "@pages/api/dataProvider";
import {getCanonicalPath} from "@shared/utils/getCanonicalPath";

export const staticPathsHandler = (isRelated = false): GetStaticPaths => async () => {
    try {
        const data = await getData();
        if (!data) return {paths: [], fallback: false};

        const paths = isRelated
            ? (data.relatedServices || []).map(({canonical}) => ({
                params: {categoryId: getCanonicalPath(canonical)},
            }))
            : (data.prices?.repairs || []).flatMap(category =>
                category.priceList?.map(item => ({
                    params: {
                        categoryId: category.id,
                        serviceId: getCanonicalPath(item.canonical),
                    },
                })) || []
            );

        return {paths, fallback: 'blocking'};
    } catch (error) {
        console.error(error);
        return {paths: [], fallback: false};
    }
};
