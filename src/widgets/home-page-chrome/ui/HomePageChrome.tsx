'use client';

import type { FC } from 'react';

import { UI, useLocale, type UiMessageKey } from '@shared/i18n';
import { HOME_SECTION_NAV_LINKS } from '@shared/lib/homeSectionNavConfig';

import { useHomePageChrome } from '../hooks/useHomePageChrome';
import styles from './HomePageChrome.module.css';

/** Порядок = `HOME_SECTION_NAV_LINKS` в `homeSectionNavConfig`. */
const HOME_NAV_LABEL_KEYS: readonly UiMessageKey[] = [
	UI.homeChromeNavOffer,
	UI.homeChromeNavServices,
	UI.homeChromeNavApproach,
	UI.homeChromeNavSteps,
	UI.homeChromeNavExamples,
	UI.homeChromeNavTrust,
	UI.homeChromeNavCosting,
	UI.homeChromeNavRelated,
	UI.homeChromeNavFaq,
	UI.homeChromeNavReviews,
	UI.homeChromeNavQuiz,
	UI.homeChromeNavAppeal,
];

const HomePageChrome: FC = () => {
	const { t } = useLocale();
	const { activeId, progress, isHeroOutOfView } = useHomePageChrome();

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			<div
				aria-hidden="true"
				className={`${styles.scrollProgress} ${isHeroOutOfView ? styles.visible : ''}`}
				style={{ transform: `scaleX(${progress})` }}
			/>
			<nav
				aria-label={t(UI.homeChromeSectionNavAria)}
				className={`${styles.sectionNav} ${isHeroOutOfView ? styles.visible : ''}`}
			>
				<button
					type="button"
					className={styles.toTopButton}
					onClick={scrollToTop}
					aria-label={t(UI.homeChromeScrollTopAria)}
				>
					{t(UI.homeChromeScrollTopLabel)}
				</button>
				<ol className={styles.sectionNavList}>
					{HOME_SECTION_NAV_LINKS.map((item, index) => {
						const isActive = activeId === item.id;
						return (
							<li key={item.id}>
								<a
									aria-current={isActive ? 'location' : undefined}
									className={`${styles.sectionNavLink} ${isActive ? styles.sectionNavLinkActive : ''}`}
									href={`#${item.id}`}
								>
									{t(HOME_NAV_LABEL_KEYS[index])}
								</a>
							</li>
						);
					})}
				</ol>
			</nav>
		</>
	);
};

export default HomePageChrome;
