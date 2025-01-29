import {GetStaticPaths, GetStaticProps} from "next";
import RelatedServiceDetail from "@features/related-services/ui/RelatedServiceDetail/RelatedServiceDetail";
import {findRelatedService} from "@features/related-services/utils/findRelatedService";
import {RelatedParams} from "@features/related-services/interface/RelatedService.props";
import {getServiceIdFromCanonical} from "@features/services/utils/findService";
import {getData} from "@pages/api/dataProvider";
import {DataProps} from "@widgets/interface/interfaceData";
import {getCommonProps} from "@shared/utils/getCommonProps";

export const getStaticPaths: GetStaticPaths = async () => {
    const data: DataProps = await getData();
    const relatedServices = data.relatedServices;

    if (!Array.isArray(relatedServices)) {
        return {paths: [], fallback: false};
    }

    const paths = relatedServices.map(({canonical}) => ({
        params: {categoryId: getServiceIdFromCanonical(canonical)},
    }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const data: DataProps = await getData();
    const {categoryId} = params as RelatedParams;

    if (typeof categoryId !== 'string') {
        return {notFound: true};
    }

    const relatedServices = findRelatedService(data, categoryId);
    if (!relatedServices) {
        return {notFound: true};
    }

    return {
        props: {
            relatedServices,
            ...getCommonProps(data),
        },
    };
};

export default RelatedServiceDetail;
