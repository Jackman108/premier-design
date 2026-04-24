'use client';

/**
 * Подпись подрядчика на разработку в футере. Данные ссылки и ассета — `@shared/constants/company`.
 */
import {DEVELOPER_STUDIO_FEB_CODE} from '@shared/constants/company';
import Image from 'next/image';
import {FC} from 'react';
import styles from './DeveloperCredit.module.css';

const DeveloperCredit: FC = () => {
	const {siteUrl, logoSrc, logoAlt, creditLabel} = DEVELOPER_STUDIO_FEB_CODE;

	return (
		<a className={styles.link} href={siteUrl} target="_blank" rel="noopener noreferrer">
			<span className={styles.label}>{creditLabel}</span>
			<Image
				src={logoSrc}
				alt={logoAlt}
				width={112}
				height={56}
				className={styles.logo}
				style={{width: 'auto', height: '36px'}}
			/>
		</a>
	);
};

export default DeveloperCredit;
