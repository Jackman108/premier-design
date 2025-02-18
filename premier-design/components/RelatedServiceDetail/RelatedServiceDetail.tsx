import {FC} from "react";
import {useRouter} from "next/router";
import CustomHead from "../CustomHead/CustomHead";
import styles from '../ServiceDetail/ServiceDetail.module.css';
import {getFullCanonicalUrl} from "../../utils/getFullCanonicalUrl";
import Layout from "../../Layout/Layout";
import Image from "next/image";
import BackButton from "../UX/BackButton/BackButton";
import OrderButton from "../UX/OrderButton/OrderButton";
import {findItemByTitle} from "../../utils/findItemByTitle";
import {ButtonProps} from "../../interface/Button.props";
import type {RelatedServiceDetail} from "../../interface/RelatedService.props";

const RelatedServiceDetail: FC<RelatedServiceDetail> = ({
                                                            relatedServices,
                                                            menuData,
                                                            papersData,
                                                            newsData,
                                                            costingData,
                                                            buttonData,
                                                            panelData,
                                                        }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div className={styles.loader}>Подгружаем данные...</div>;
    }
    if (!relatedServices) {
        return <div className={styles.error}>Service not found.</div>;
    }
    const buttonHeader = findItemByTitle(buttonData, "leave_request") || {} as ButtonProps;
    const fullCanonicalUrl = getFullCanonicalUrl(relatedServices.canonical);

    return (
        <>
            <CustomHead
                metaTitle={relatedServices.title}
                metaDescription={relatedServices.description}
                canonical={fullCanonicalUrl}
            />
            <Layout
                headerProps={{menu: menuData}}
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
                        <h1 className={styles.title}>{relatedServices.title}</h1>
                        <h2 className={styles.subTitle}>{relatedServices.subTitle}</h2>
                        <div className={styles.image_wrapper}>
                            <Image
                                priority={true}
                                src={relatedServices.image}
                                alt={relatedServices.title}
                                quality={95}
                                width={920}
                                height={600}
                                sizes="(max-width: 600px) 100vw, 920px"
                                placeholder="blur"
                                blurDataURL={relatedServices.image}
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.button}>
                            <OrderButton buttonStyle='button-black' buttonData={buttonHeader.buttonHeader}/>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h3 className={styles.description}>{relatedServices.description}</h3>
                        <div className={styles.info}>
                            <h3 className={styles.subheading}>Преимущества:</h3>
                            <ul>
                                {relatedServices.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                            <p>{relatedServices.text}</p>
                            <h3 className={styles.subheading}>Зачем это нужно вам?</h3>
                            <ul>
                                {relatedServices.triggers.map((trigger, index) => (
                                    <li key={index}>{trigger}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    <BackButton/>
                </section>
            </Layout>
        </>
    );
};

export default RelatedServiceDetail;
