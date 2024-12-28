import {FC} from "react";
import {useRouter} from "next/router";
import {ServiceDetailProps} from "../../interface/ServiceDetail.props";
import CustomHead from "../CustomHead/CustomHead";
import styles from './ServiceDetail.module.css';

const ServiceDetail: FC<ServiceDetailProps> = ({service, categoryDescription}) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <CustomHead title={service.service} description={categoryDescription} canonical={service.canonical}/>
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
