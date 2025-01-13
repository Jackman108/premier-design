import {GetStaticPaths, GetStaticProps} from 'next';
import ServiceDetail from "../../../components/ServiceDetail/ServiceDetail";
import data from '../../../data/data.json';
import {Params} from "../../../interface/ServiceDetail.props";
import {findService, getServiceIdFromCanonical} from "../../../utils/findService";

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

    const {menu, papers, news, cards, button, panel} = data;

    return {
        props: {
            service,
            categoryProps,
            menuData: menu,
            papersData: papers,
            newsData: news,
            costingData: cards.costingCard,
            buttonData: button,
            panelData: panel,
        },
    };
};

export default ServiceDetail;
