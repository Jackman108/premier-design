import type { Metadata } from 'next';
import Link from 'next/link';

import { buildSitemapHeadProps } from '@shared/lib/app-router/seo/marketingPagesHead';
import { collectSitePathnames } from '@shared/lib/collectSitePathnames';
import { getCachedData } from '@shared/lib/getStaticData';
import { selectPageData } from '@shared/hooks/usePageData';
import { customHeadPropsToMetadata } from '@shared/lib/seo/customHeadPropsToMetadata';
import { getFullCanonicalUrl } from '@shared/utils/getFullCanonicalUrl';
import { buildLayoutProps } from '@widgets/layout/lib/buildLayoutProps';
import { StructuredDataScript } from '@widgets/layout/seo/StructuredDataScript';
import Layout from '@widgets/layout/ui/layout/Layout';

import styles from './sitemap.module.css';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedData();
	return customHeadPropsToMetadata(buildSitemapHeadProps(data));
}

export default async function SitemapHtmlPage() {
	const data = await getCachedData();
	const head = buildSitemapHeadProps(data);
	const { titleItem: titleData } = selectPageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'sitemap',
		'leave_request',
		'repair_banner',
	);
	const paths = collectSitePathnames(data);
	const layoutProps = buildLayoutProps(data);

	return (
		<>
			<StructuredDataScript {...head} />
			<Layout {...layoutProps}>
				<div className={styles.page}>
					<div className={styles.inner}>
						<header className={styles.header}>
							<h1 className={styles.title}>{titleData.title}</h1>
							<p className={styles.lead}>{titleData.description}</p>
						</header>
						<p className={styles.note}>
							Также доступна машиночитаемая карта:{' '}
							<a className={styles.xmlLink} href="/sitemap.xml">
								sitemap.xml
							</a>
							.
						</p>
						<ul className={styles.list}>
							{paths.map((path) => {
								const href = path === '' ? '/' : path;
								const label = path === '' ? 'Главная' : path;
								return (
									<li key={path || 'root'} className={styles.item}>
										<Link className={styles.link} href={href}>
											{label}
										</Link>
										<span className={styles.url}>
											{getFullCanonicalUrl(path === '' ? '/' : path)}
										</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</Layout>
		</>
	);
}
