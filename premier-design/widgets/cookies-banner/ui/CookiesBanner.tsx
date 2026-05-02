'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { UI, useLocale } from '@shared/i18n';
import { documentHref, type Paper } from '@features/papers';

import { useCookiesBannerWidget } from '../hooks/useCookiesBannerWidget';
import styles from './CookiesBanner.module.css';

const CheckmarkIcon = '/checkmark.svg';

const CookiesBanner = ({ papers }: { papers: Paper[] }) => {
	const { t } = useLocale();
	const { handleAction, isOpen, privacyPolicy } = useCookiesBannerWidget(papers);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.cookies}>
			<div className={styles.container}>
				<div className={styles.cookiesLeft}>
					<h2 className={styles.cookiesTitle}>{t(UI.cookiesTitle)}</h2>
					<p className={styles.cookiesContent}>{t(UI.cookiesDescription)}</p>
					<p className={styles.cookiesContent}>
						{privacyPolicy ? (
							<Link
								href={documentHref(privacyPolicy.shortTitle)}
								className={styles.link}
								aria-label={t(UI.cookiesPrivacyOpenAria)}
							>
								{t(UI.cookiesPrivacyLinkText)}
							</Link>
						) : null}
					</p>
				</div>
				<div className={styles.cookiesRight}>
					<button
						className={`${styles.btn} ${styles.accent}`}
						onClick={() => handleAction(true)}
						aria-label={t(UI.cookiesAcceptAllAria)}
						type="button"
					>
						<Image
							src={CheckmarkIcon}
							alt={t(UI.cookiesCheckmarkAlt)}
							className={styles.checkboxIcon}
							width={19}
							height={14}
						/>
						<span>{t(UI.cookiesAcceptButtonText)}</span>
					</button>
					<button
						className={`${styles.btn} ${styles.white}`}
						onClick={() => handleAction(false)}
						aria-label={t(UI.cookiesRejectAllAria)}
						type="button"
					>
						{t(UI.cookiesRejectButtonText)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CookiesBanner;
