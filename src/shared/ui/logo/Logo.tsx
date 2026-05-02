'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { type ReactElement } from 'react';

import { UI, useLocale } from '@shared/i18n';

import LogoImage from '../../../../public/logo.svg';
import styles from './Logo.module.css';

const LOGO_IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 1440px) 60vw, 1935px';

const Logo = (): ReactElement => {
	const { t } = useLocale();
	return (
		<div className={styles.logo}>
			<Link href="/" className={styles.logo__image} aria-label={t(UI.commonLogoHomeAria)}>
				<Image
					src={LogoImage}
					alt="Logo"
					placeholder="empty"
					width={2000}
					height={160}
					sizes={LOGO_IMAGE_SIZES}
					priority
					className={styles.image}
				/>
			</Link>
		</div>
	);
};

export default Logo;
