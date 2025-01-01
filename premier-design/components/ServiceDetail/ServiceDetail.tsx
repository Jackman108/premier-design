import {FC} from "react";
import {useRouter} from "next/router";
import {ServiceDetailProps} from "../../interface/ServiceDetail.props";
import CustomHead from "../CustomHead/CustomHead";
import styles from './ServiceDetail.module.css';
import {getFullCanonicalUrl} from "../../utils/findService";
import Layout from "../../Layout/Layout";

const ServiceDetail: FC<ServiceDetailProps> = ({
                                                   service,
                                                   categoryDescription,
                                                   menuData,
                                                   papersData,
                                                   newsData,
                                               }) => {
    const router = useRouter();
    const fullCanonicalUrl = getFullCanonicalUrl(service.canonical);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CustomHead
                title={service.service}
                description={categoryDescription}
                canonical={fullCanonicalUrl}
            />
            <Layout
                headerProps={{menu: menuData}}
                footerProps={{
                    papers: papersData,
                    news: newsData,
                    menu: menuData,
                }}
            >
                <section>
                    <h1 className={styles.categoryDetail}>{categoryDescription}</h1>
                    <p>
                        <span>{service.service}</span>
                        <span><strong>Ед. измер</strong>: {service.unit}</span>
                        <span><strong>Цена</strong>: {service.price}</span>
                    </p>
                </section>
            </Layout>

        </>
    );
};

export default ServiceDetail;
