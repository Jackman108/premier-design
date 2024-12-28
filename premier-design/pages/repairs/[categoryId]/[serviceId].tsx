import {GetStaticPaths, GetStaticProps} from 'next';
import ServiceDetail from "../../../components/ServiceDetail/ServiceDetail";
import data from '../../../data/data.json';
import {Params} from "../../../interface/ServiceDetail.props";
import {findService} from "../../../utils/findService";

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = data.prices.repairs.flatMap(category =>
        category.priceList.map(item => ({
            params: {
                categoryId: category.id,
                serviceId: item.canonical.split('/').pop() || '',
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

    const {service, categoryDescription} = findService(categoryId, serviceId);


    if (!service) {
        return {notFound: true};
    }
    return {
        props: {
            service,
            categoryDescription,
        },
    };
};

export default ServiceDetail;
