import type {NextPage} from 'next';
import type {ReactElement} from 'react';
import Link from 'next/link';

import {collectSitePathnames} from '@lib/collectSitePathnames';
import {getStaticProps} from '@lib/getStaticData';
import {usePageData} from '@shared/hooks/usePageData';
import {getFullCanonicalUrl} from '@shared/utils/getFullCanonicalUrl';
import {GetDataProps} from '@widgets/interface/interfaceData';
import CustomHead from '@widgets/layout/seo/CustomHead/CustomHead';
import {useLayoutProps} from '@widgets/layout/hooks/useLayoutProps';
import Layout from '@widgets/layout/ui/layout/Layout';

import styles from './sitemap.module.css';

const SitemapPage: NextPage<GetDataProps> = ({data}): ReactElement => {
	const {titleItem: titleData} = usePageData(
		data.titlesPage,
		data.button,
		data.bannersImages,
		'sitemap',
		'leave_request',
		'repair_banner',
	);
	const paths = collectSitePathnames(data);
	const layoutProps = useLayoutProps(data);

	return (
		<>
			<CustomHead {...titleData} structuredDataRating={data.trustSignals.structuredDataRating} />
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
										<span className={styles.url}>{getFullCanonicalUrl(path === '' ? '/' : path)}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</Layout>
		</>
	);
};

export {getStaticProps};
export default SitemapPage;
