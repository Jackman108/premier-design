import {GetStaticPaths, GetStaticProps} from "next";
import RelatedServiceDetail from "../../components/RelatedServiceDetail/RelatedServiceDetail";
import {findRelatedService} from "../../utils/findRelatedService";
import data from "../../data/data.json";
import {RelatedParams} from "../../interface/RelatedService.props";
import {getServiceIdFromCanonical} from "../../utils/findService";

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

    const {menu, papers, news, cards, button, panel} = data;

    return {
        props: {
            relatedServices,
            menuData: menu,
            papersData: papers,
            newsData: news,
            costingData: cards.costingCard,
            buttonData: button,
            panelData: panel,
        },
    };
};

export default RelatedServiceDetail;
