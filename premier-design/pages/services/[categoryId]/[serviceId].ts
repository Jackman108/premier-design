import {GetStaticPaths, GetStaticProps} from 'next';
import ServiceDetail from "@features/services/ui/ServiceDetail/ServiceDetail";
import {Params} from "@features/services/interface/ServiceDetail.props";
import {findService, getServiceIdFromCanonical} from "@features/services/utils/findService";
import {getData} from "@pages/api/dataProvider";
import {DataProps} from "@widgets/interface/interfaceData";
import {getCommonProps} from "@shared/utils/getCommonProps";


export const getStaticPaths: GetStaticPaths = async () => {
    const data: DataProps = await getData();
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
    const data: DataProps = await getData();

    const {service, categoryProps} = findService(data, categoryId, serviceId);
    if (!service) {
        return {notFound: true};
    }

    return {
        props: {
            service,
            categoryProps,
            ...getCommonProps(data),
        },
    };
};

export default ServiceDetail;
