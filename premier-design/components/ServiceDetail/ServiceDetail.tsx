import {FC} from "react";
import {useRouter} from "next/router";
import {ServiceDetailProps} from "../../interface/ServiceDetail.props";
import CustomHead from "../CustomHead/CustomHead";
import styles from './ServiceDetail.module.css';
import {getFullCanonicalUrl} from "../../utils/findService";

const ServiceDetail: FC<ServiceDetailProps> = ({service, categoryDescription}) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const fullCanonicalUrl = getFullCanonicalUrl(service.canonical);

    return (
        <>
            <CustomHead
                title={service.service}
                description={categoryDescription}
                canonical={fullCanonicalUrl}
            />
            <section>
                <h1 className={styles.categoryDetail}>{categoryDescription}</h1>
                <p>
                    <span>{service.service}</span>
                    <span><strong>Ед. измер</strong>: {service.unit}</span>
                    <span><strong>Цена</strong>: {service.price}</span>
                </p>
            </section>
        </>
    );
};

export default ServiceDetail;
