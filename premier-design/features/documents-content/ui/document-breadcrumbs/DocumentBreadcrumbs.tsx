'use client';

import Link from 'next/link';
import type {FC} from 'react';

import {useDocumentBreadcrumbs} from '@features/documents-content/hooks/useDocumentBreadcrumbs';
import styles from './DocumentBreadcrumbs.module.css';

const DocumentBreadcrumbs: FC = () => {
	const meta = useDocumentBreadcrumbs();

	if (!meta) {
		return null;
	}

	return (
		<nav aria-label='Навигация по сайту' className={styles.nav}>
			<ol className={styles.list}>
				<li className={styles.item}>
					<Link className={styles.link} href='/'>
						Главная
					</Link>
				</li>
				<li aria-current='page' className={`${styles.item} ${styles.current}`}>
					{meta.pageTitle}
				</li>
			</ol>
		</nav>
	);
};

export default DocumentBreadcrumbs;
