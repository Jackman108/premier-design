import {FC} from "react";
import {useRouter} from "next/router";
import {ServiceDetailProps} from "@features/services/interface/ServiceDetail.props";
import CustomHead from "../../../../widgets/layout/seo/CustomHead/CustomHead";
import styles from './ServiceDetail.module.css';
import {getFullCanonicalUrl} from "../../../../widgets/layout/seo/utils/getFullCanonicalUrl";
import Layout from "../../../../widgets/layout/ui/layout/Layout";
import Image from "next/image";
import BackButton from "@shared/ui/back-button/BackButton";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {ButtonProps} from "@shared/interface/Button.props";

const ServiceDetail: FC<ServiceDetailProps> = ({
                                                   service,
                                                   categoryProps,
                                                   menuData,
                                                   papersData,
                                                   newsData,
                                                   costingData,
                                                   buttonData,
                                                   panelData,
                                                   sharesData
                                               }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div className={styles.loader}>Подгружаем данные...</div>;
    }
    if (!service || !categoryProps) {
        return <div className={styles.error}>Service not found.</div>;
    }
    const buttonHeader = findItemByTitle(buttonData, "leave_request") || {} as ButtonProps;
    const fullCanonicalUrl = getFullCanonicalUrl(service.canonical);

    return (
        <>
            <CustomHead
                metaTitle={service.service}
                metaDescription={categoryProps.description}
                canonical={fullCanonicalUrl}
            />
            <Layout
                headerProps={{
                    menu: menuData,
                    shares: sharesData
                }}
                footerProps={{
                    papers: papersData,
                    news: newsData,
                    menu: menuData,
                }}
                additionalData={{
                    costingCards: costingData,
                    buttonData: buttonData,
                    panelData: panelData
                }}
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
                                920px
                                "
                                placeholder="blur"
                                blurDataURL={categoryProps.image.src}
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
