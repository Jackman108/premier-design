'use client';

import {FC} from "react";
import {ServiceDetailProps} from "@features/services/interface/ServiceDetail.props";
import styles from './ServiceDetail.module.css';
import Layout from "@widgets/layout/ui/layout/Layout";
import Image from "next/image";
import BackButton from "@shared/ui/back-button/BackButton";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import type { ButtonProps } from '@entities/button';
import {useFallback} from "@shared/hooks/useFallback";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {Appeal} from '@lib/dynamicSectionImports';
import pageShell from '@shared/ui/page-detail-shell/pageDetailShell.module.css';

const SERVICE_DETAIL_IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 1440px) 60vw, 920px';

const ServiceDetail: FC<ServiceDetailProps> = ({
	service,
	categoryProps,
	menuData,
	papersData,
	newsData,
	costingData,
	buttonData,
	panelData,
	sharesData,
	appealSection,
}) => {
    const fallbackContent = useFallback(!!service && !!categoryProps);
    const buttonHeader = findItemByTitle(buttonData, "leave_request") || {} as ButtonProps;
    const layoutProps = useLayoutProps({
        menu: menuData,
        shares: sharesData,
        papers: papersData,
        news: newsData,
        costingCard: costingData,
        button: buttonData,
        panel: panelData
    }, {headerVariant: 'solidDark'});

    return fallbackContent || (
        <>
            <Layout {...layoutProps}>
                <section className={pageShell.root} aria-labelledby="service-detail-title">
                    <div className={pageShell.inner}>
                        <div className={pageShell.card}>
                            <div className={pageShell.layout}>
                                <div className={pageShell.colMain}>
                                    <h1 id="service-detail-title" className={pageShell.title}>{categoryProps.title}</h1>
                                    <div className={pageShell.imageFrame}>
                                        <Image
                                            priority={true}
                                            src={categoryProps.image.src}
                                            alt={categoryProps.image.alt}
                                            quality={categoryProps.image.quality}
                                            width={categoryProps.image.width}
                                            height={categoryProps.image.height}
                                            sizes={SERVICE_DETAIL_IMAGE_SIZES}
                                            placeholder="empty"
                                            className={pageShell.image}
                                        />
                                    </div>
                                </div>
                                <div className={pageShell.colAside}>
                                    <p className={pageShell.lead}>{categoryProps.description}</p>
                                    <div className={`${pageShell.prose} ${styles.infoPanel}`}>
                                        <div className={pageShell.metaGrid}>
                                            <span className={pageShell.metaLabel}>Услуга</span>
                                            <span className={pageShell.metaValue}>{service.service}</span>
                                            <span className={pageShell.metaLabel}>Единица измерения</span>
                                            <span className={pageShell.metaValue}>{service.unit}</span>
                                            <span className={pageShell.metaLabel}>Цена</span>
                                            <span className={pageShell.metaValue}>{service.price}</span>
                                        </div>
                                    </div>
                                    <div className={pageShell.ctaRow}>
                                        <OrderButton buttonStyle='button-black' buttonData={buttonHeader.buttonHeader}/>
                                    </div>
                                </div>
                            </div>
                            <div className={pageShell.actions}>
                                <div className={pageShell.backRow}>
                                    <BackButton/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
				<Appeal {...appealSection} />
			</Layout>
        </>
    );
};

export default ServiceDetail;
