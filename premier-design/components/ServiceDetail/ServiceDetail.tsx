import {FC} from "react";
import {useRouter} from "next/router";
import {ServiceDetailProps} from "../../interface/ServiceDetail.props";
import CustomHead from "../CustomHead/CustomHead";
import styles from './ServiceDetail.module.css';
import {getFullCanonicalUrl} from "../../utils/findService";
import Layout from "../../Layout/Layout";
import Image from "next/image";
import BackButton from "../UX/BackButton/BackButton";
import OrderButton from "../UX/OrderButton/OrderButton";
import {findItemByTitle} from "../../utils/findItemByTitle";
import {ButtonProps} from "../../interface/Button.props";

const ServiceDetail: FC<ServiceDetailProps> = ({
                                                   service,
                                                   categoryProps,
                                                   menuData,
                                                   papersData,
                                                   newsData,
                                                   costingData,
                                                   buttonData,
                                                   panelData,
                                               }) => {
    const buttonHeader = findItemByTitle(buttonData, "leave_request") || {} as ButtonProps;

    const router = useRouter();

    if (router.isFallback) {
        return <div className={styles.loader}>Loading...</div>;
    }
    if (!service) {
        return <div className={styles.error}>Service not found.</div>;
    }

    const fullCanonicalUrl = getFullCanonicalUrl(service.canonical);
    return (
        <>
            <CustomHead
                title={service.service}
                description={categoryProps.description}
                canonical={fullCanonicalUrl}
            />
            <Layout
                headerProps={{menu: menuData}}
                footerProps={{
                    papers: papersData,
                    news: newsData,
                    menu: menuData,
                }}
                costingCards={costingData}
                buttonData={buttonData}
                panelData={panelData}
            >
                <section className={styles.service_detail}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>{categoryProps.title}</h1>
                        <div className={styles.image_wrapper}>
                            <Image
                                priority={true}
                                src={categoryProps.image.src}
                                alt={categoryProps.image.alt}
                                quality={categoryProps.image.quality}
                                width={categoryProps.image.width}
                                height={categoryProps.image.height}
                                sizes="
                                (max-width: 600px) 100vw,
                                (max-width: 1440px) 60vw,
                                1935px
                                "
                                placeholder='empty'
                                className={styles.image}
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.description}>{categoryProps.description}</h2>
                        <div className={styles.info}>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Услуга:</span>
                                <span className={styles.value}>{service.service}</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Единица измерения:</span>
                                <span className={styles.value}>{service.unit}</span>
                            </div>
                            <div className={styles.info_row}>
                                <span className={styles.label}>Цена:</span>
                                <span className={styles.value}>{service.price}</span>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <OrderButton buttonStyle='button-black' buttonData={buttonHeader.buttonHeader}/>
                        </div>
                    </div>
                    <BackButton/>
                </section>
            </Layout>
        </>
    );
};

export default ServiceDetail;
