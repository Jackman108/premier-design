import {FC} from "react";
import CustomHead from "@widgets/layout/seo/CustomHead/CustomHead";
import styles from '@features/services/ui/ServiceDetail/ServiceDetail.module.css';
import {getFullCanonicalUrl} from "@widgets/layout/seo/utils/getFullCanonicalUrl";
import Layout from "@widgets/layout/ui/layout/Layout";
import Image from "next/image";
import BackButton from "@shared/ui/back-button/BackButton";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import {ButtonProps} from "@shared/interface/Button.props";
import type {RelatedServiceDetail} from "@features/related-services/interface/RelatedService.props";
import {useFallback} from "@shared/hooks/useFallback";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";

const RelatedServiceDetail: FC<RelatedServiceDetail> = ({
                                                            relatedServices,
                                                            menuData,
                                                            papersData,
                                                            newsData,
                                                            costingData,
                                                            buttonData,
                                                            panelData,
                                                            sharesData
                                                        }) => {
    const fallbackContent = useFallback(!!relatedServices);
    const buttonHeader = findItemByTitle(buttonData, "leave_request") || {} as ButtonProps;
    const layoutProps = useLayoutProps({
        menu: menuData,
        shares: sharesData,
        papers: papersData,
        news: newsData,
        costingCard: costingData,
        button: buttonData,
        panel: panelData
    });

    return fallbackContent || (
        <>
            <CustomHead
                metaTitle={relatedServices.title}
                metaDescription={relatedServices.description}
                canonical={getFullCanonicalUrl(relatedServices.canonical)}
            />
            <Layout {...layoutProps}>
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
