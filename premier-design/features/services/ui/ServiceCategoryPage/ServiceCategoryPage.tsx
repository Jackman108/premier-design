'use client';

import { Appeal } from '@shared/lib/dynamicSectionImports';
import { useFallback } from '@shared/hooks/useFallback';
import type { ButtonProps } from '@entities/button';
import type { Category } from '@entities/service';
import type { CostingCardProps } from '@entities/costing';
import type { NewsProps } from '@entities/news';
import type { PanelProps } from '@entities/panel';
import type { Paper } from '@entities/document';
import type { ShareBannerDataProps } from '@entities/share-banner';
import type { AppealSectionData } from '@entities/appeal';
import type { StructuredDataAggregateRating } from '@entities/review';
import BackButton from '@shared/ui/back-button/BackButton';
import type { MenuItem } from '@shared/ui/menu/interface/Menu.props';
import OrderButton from '@shared/ui/order/ui/OrderButton/OrderButton';
import pageShell from '@shared/ui/page-detail-shell/pageDetailShell.module.css';
import pricingStyles from '@shared/ui/pricing-table/pricingTable.module.css';
import { findItemByTitle } from '@shared/utils/findItemByTitle';
import { useLayoutProps } from '@widgets/layout/hooks/useLayoutProps';
import Layout from '@widgets/layout/ui/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './ServiceCategoryPage.module.css';

const IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 1440px) 60vw, 920px';

export interface ServiceCategoryPageProps {
	category: Category;
	menuData: MenuItem[];
	papersData: Paper[];
	newsData: NewsProps[];
	costingData: CostingCardProps[];
	buttonData: ButtonProps[];
	panelData: PanelProps[];
	sharesData: ShareBannerDataProps[];
	appealSection: AppealSectionData;
	structuredDataRating?: StructuredDataAggregateRating;
}

const ServiceCategoryPage: FC<ServiceCategoryPageProps> = ({
	category,
	menuData,
	papersData,
	newsData,
	costingData,
	buttonData,
	panelData,
	sharesData,
	appealSection,
}) => {
	const fallbackContent = useFallback(!!category);
	const buttonHeader = findItemByTitle(buttonData, 'leave_request') || ({} as ButtonProps);
	const layoutProps = useLayoutProps(
		{
			menu: menuData,
			shares: sharesData,
			papers: papersData,
			news: newsData,
			costingCard: costingData,
			button: buttonData,
			panel: panelData,
		},
		{ headerVariant: 'solidDark' },
	);

	return (
		fallbackContent || (
			<>
				<Layout {...layoutProps}>
					<section className={pageShell.root} aria-labelledby="service-category-title">
						<div className={pageShell.inner}>
							<div className={pageShell.card}>
								<div className={pageShell.layout}>
									<div className={pageShell.colMain}>
										<h1 id="service-category-title" className={pageShell.title}>
											{category.title}
										</h1>
										<div className={pageShell.imageFrame}>
											<Image
												priority
												src={category.image.src}
												alt={category.image.alt}
												quality={category.image.quality}
												width={category.image.width}
												height={category.image.height}
												sizes={IMAGE_SIZES}
												placeholder="empty"
												className={pageShell.image}
											/>
										</div>
									</div>
									<div className={pageShell.colAside}>
										<p className={pageShell.lead}>{category.description}</p>
										<div className={`${pageShell.prose} ${styles.tableIntro}`}>
											<p className={styles.tableIntroText}>
												Перечень работ и ориентировочные цены по категории:
											</p>
										</div>
									</div>
								</div>
								<div className={styles.tableWrap}>
									<table className={pricingStyles.table}>
										<thead>
											<tr className={pricingStyles.tr}>
												<th className={pricingStyles.th}>Услуга</th>
												<th className={`${pricingStyles.th} ${pricingStyles.unitColumn}`}>
													Ед. изм.
												</th>
												<th className={`${pricingStyles.th} ${pricingStyles.priceColumn}`}>
													Цена
												</th>
											</tr>
										</thead>
										<tbody>
											{category.priceList.map((item, idx) => (
												<tr key={idx} className={pricingStyles.tr}>
													<td className={pricingStyles.td}>
														<Link
															href={item.canonical}
															className={pricingStyles.link}
															aria-label={`Перейти к разделу ${item.service}`}
														>
															{item.service}
														</Link>
													</td>
													<td className={`${pricingStyles.td} ${pricingStyles.unitColumn}`}>
														{item.unit}
													</td>
													<td className={`${pricingStyles.td} ${pricingStyles.priceColumn}`}>
														{item.price}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className={pageShell.actions}>
									<BackButton />
									<OrderButton buttonData={buttonHeader.buttonHeader} buttonStyle="button-black" />
								</div>
							</div>
						</div>
					</section>
					<Appeal {...appealSection} />
				</Layout>
			</>
		)
	);
};

export default ServiceCategoryPage;
