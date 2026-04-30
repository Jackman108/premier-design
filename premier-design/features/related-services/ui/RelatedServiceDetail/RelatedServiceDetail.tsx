'use client';

import {FC} from "react";
import styles from './RelatedServiceDetail.module.css';
import Layout from "@widgets/layout/ui/layout/Layout";
import Image from "next/image";
import BackButton from "@shared/ui/back-button/BackButton";
import OrderButton from "@shared/ui/order/ui/OrderButton/OrderButton";
import {findItemByTitle} from "@shared/utils/findItemByTitle";
import type { ButtonProps } from '@entities/button';
import {RelatedServiceDetailProps} from "@features/related-services/interface/RelatedService.props";
import {useFallback} from "@shared/hooks/useFallback";
import {useLayoutProps} from "@widgets/layout/hooks/useLayoutProps";
import {Appeal} from '@lib/dynamicSectionImports';
import pageShell from '@shared/ui/page-detail-shell/pageDetailShell.module.css';

const RelatedServiceDetail: FC<RelatedServiceDetailProps> = ({
	relatedService,
	menuData,
	papersData,
	newsData,
	costingData,
	buttonData,
	panelData,
	sharesData,
	appealSection,
}) => {
    const fallbackContent = useFallback(!!relatedService);
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
                <section className={pageShell.root} aria-labelledby="related-service-title">
                    <div className={pageShell.inner}>
                        <div className={pageShell.card}>
                            <div className={pageShell.layout}>
                                <div className={pageShell.colMain}>
                                    <h1 id="related-service-title" className={pageShell.title}>{relatedService.title}</h1>
                                    <p className={pageShell.subtitle}>{relatedService.subTitle}</p>
                                    <div className={pageShell.imageFrame}>
                                        <Image
                                            priority={true}
                                            src={relatedService.image}
                                            alt={relatedService.title}
                                            quality={95}
                                            width={920}
                                            height={600}
                                            sizes="(max-width: 600px) 100vw, 920px"
                                            placeholder="empty"
                                            className={pageShell.image}
                                        />
                                    </div>
                                    <div className={pageShell.ctaRow}>
                                        <OrderButton buttonStyle='button-black' buttonData={buttonHeader.buttonHeader}/>
                                    </div>
                                </div>
                                <div className={pageShell.colAside}>
                                    <p className={pageShell.lead}>{relatedService.description}</p>
                                    <div className={`${pageShell.prose} ${styles.infoPanel}`}>
                                        <h2 className={pageShell.subheading}>Преимущества</h2>
                                        <ul className={styles.list}>
                                            {relatedService.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul>
                                        <p className={styles.textBlock}>{relatedService.text}</p>
                                        <h2 className={pageShell.subheading}>Зачем это нужно вам?</h2>
                                        <ul className={styles.list}>
                                            {relatedService.triggers.map((trigger, index) => (
                                                <li key={index}>{trigger}</li>
                                            ))}
                                        </ul>
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

export default RelatedServiceDetail;
