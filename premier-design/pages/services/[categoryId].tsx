import {GetStaticPaths, GetStaticProps} from "next";
import RelatedServiceDetail from "@features/related-services/ui/RelatedServiceDetail/RelatedServiceDetail";
import {findRelatedService} from "@features/related-services/utils/findRelatedService";
import data from "../../data/data.json";
import {RelatedParams} from "@features/related-services/interface/RelatedService.props";
import {getServiceIdFromCanonical} from "@features/services/utils/findService";

export const getStaticPaths: GetStaticPaths = async () => {
    const relatedServices = data.relatedServices;

    if (!Array.isArray(relatedServices)) {
        return {paths: [], fallback: false};
    }

    const paths = relatedServices.map(({canonical}) => ({
        params: {categoryId: getServiceIdFromCanonical(canonical)},
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {categoryId} = params as RelatedParams;

    if (typeof categoryId !== 'string') {
        return {notFound: true};
    }

    const relatedServices = findRelatedService(categoryId);
    if (!relatedServices) {
        return {notFound: true};
    }

    const {menu, papers, news, costingCard, button, panel, shares} = data;

    return {
        props: {
            relatedServices,
            menuData: menu,
            papersData: papers,
            newsData: news,
            costingData: costingCard,
            buttonData: button,
            panelData: panel,
            sharesData: shares
        },
    };
};

export default RelatedServiceDetail;
