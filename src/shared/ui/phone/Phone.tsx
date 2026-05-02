'use client';

import Link from 'next/link';
import { FaPhoneVolume } from 'react-icons/fa';
import { type ReactElement } from 'react';

import { UI, useLocale } from '@shared/i18n';
import { SITE_OPERATOR } from '@shared/constants/company';

import styles from './Phone.module.css';

const Phone = (): ReactElement => {
	const { t } = useLocale();
	return (
		<div className={styles.phone}>
			<Link
				href={`tel:${SITE_OPERATOR.phone.tel}`}
				className={styles.phone__container}
				aria-label={t(UI.commonPhoneCallAria)}
			>
				<div className={styles.phone__logo}>
					<FaPhoneVolume />
				</div>
				<div className={styles.phone__number}>
					<p>{SITE_OPERATOR.phone.display}</p>
				</div>
			</Link>
		</div>
	);
};

export default Phone;
