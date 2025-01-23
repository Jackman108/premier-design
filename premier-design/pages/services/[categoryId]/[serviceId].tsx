import {GetStaticPaths, GetStaticProps} from 'next';
import ServiceDetail from "@features/services/ui/ServiceDetail/ServiceDetail";
import data from '../../../data/data.json';
import {Params} from "@features/services/interface/ServiceDetail.props";
import {findService, getServiceIdFromCanonical} from "@features/services/utils/findService";

export const getStaticPaths: GetStaticPaths = async () => {
    const services = data.prices?.repairs;

    if (!Array.isArray(services)) {
        return {paths: [], fallback: false};
    }

    const paths = services.flatMap(category =>
        category.priceList.map(item => ({
            params: {
                categoryId: category.id,
                serviceId: getServiceIdFromCanonical(item.canonical),
            }
        }))
    );

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {categoryId, serviceId} = params as Params;

    const {service, categoryProps} = findService(categoryId, serviceId);
    if (!service) {
        return {notFound: true};
    }

    const {menu, papers, news, costingCard, button, panel} = data;

    return {
        props: {
            service,
            categoryProps,
            menuData: menu,
            papersData: papers,
            newsData: news,
            costingData: costingCard,
            buttonData: button,
            panelData: panel,
        },
    };
};

export default ServiceDetail;
