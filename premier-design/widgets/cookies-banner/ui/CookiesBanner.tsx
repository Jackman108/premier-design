'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {documentHref, type Paper} from '@features/papers';

import {useCookiesBannerWidget} from '../hooks/useCookiesBannerWidget';
import styles from './CookiesBanner.module.css';

const CheckmarkIcon = '/checkmark.svg';

const CookiesBanner = ({papers}: {papers: Paper[]}) => {
	const {handleAction, isOpen, privacyPolicy} = useCookiesBannerWidget(papers);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={styles.cookies}>
			<div className={styles.container}>
				<div className={styles.cookiesLeft}>
					<h2 className={styles.cookiesTitle}>Ваша конфиденциальность важна для нас</h2>
					<p className={styles.cookiesContent}>
						Мы используем cookie-файлы для улучшения удобства просмотра и
						предоставления наиболее подходящего персонального контента для вас.
					</p>
					<p className={styles.cookiesContent}>
						{privacyPolicy ? (
							<Link
								href={documentHref(privacyPolicy.shortTitle)}
								className={styles.link}
								aria-label='Открыть Политику конфиденциальности'
							>
								Политика конфиденциальности
							</Link>
						) : null}
					</p>
				</div>
				<div className={styles.cookiesRight}>
					<button
						className={`${styles.btn} ${styles.accent}`}
						onClick={() => handleAction(true)}
						aria-label='Принять все куки'
						type='button'
					>
						<Image
							src={CheckmarkIcon}
							alt='Checkmark'
							className={styles.checkboxIcon}
							width={19}
							height={14}
						/>
						<span>Принять все</span>
					</button>
					<button
						className={`${styles.btn} ${styles.white}`}
						onClick={() => handleAction(false)}
						aria-label='Отклонить все куки'
						type='button'
					>
						Отклонить
					</button>
				</div>
			</div>
		</div>
	);
};

export default CookiesBanner;
