'use client';

import { UI, useLocale } from '@shared/i18n';
import type { SiteLocale } from '@shared/site-data/site-locale';
import { type FC } from 'react';

import styles from './SiteLocaleSwitcher.module.css';

export type SiteLocaleSwitcherVariant = 'default' | 'solidDark';

export type SiteLocaleSwitcherProps = {
	variant?: SiteLocaleSwitcherVariant;
};

const SiteLocaleSwitcher: FC<SiteLocaleSwitcherProps> = ({ variant = 'default' }) => {
	const { locale: active, setLocale, isLocalePending: pending, t } = useLocale();

	const onSelect = (next: SiteLocale) => {
		if (next === active || pending) return;
		setLocale(next);
	};

	const rootClass = variant === 'solidDark' ? `${styles.root} ${styles.rootSolidDark}` : styles.root;

	return (
		<div className={rootClass} role="group" aria-label={t(UI.localeSwitcherGroupAriaLabel)}>
			<button
				type="button"
				className={`${styles.choice} ${active === 'ru' ? styles.choiceActive : ''}`}
				lang="ru"
				aria-current={active === 'ru' ? 'true' : undefined}
				disabled={pending}
				onClick={() => onSelect('ru')}
			>
				RU
			</button>
			<span className={styles.sep} aria-hidden>
				·
			</span>
			<button
				type="button"
				className={`${styles.choice} ${active === 'en' ? styles.choiceActive : ''}`}
				lang="en"
				aria-current={active === 'en' ? 'true' : undefined}
				disabled={pending}
				onClick={() => onSelect('en')}
			>
				EN
			</button>
		</div>
	);
};

export default SiteLocaleSwitcher;
