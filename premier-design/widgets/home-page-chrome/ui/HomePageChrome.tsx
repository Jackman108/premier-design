'use client';

import type {FC} from 'react';

import {HOME_SECTION_NAV_LINKS} from '@lib/homeSectionNavConfig';
import {useHomePageChrome} from '../hooks/useHomePageChrome';
import styles from './HomePageChrome.module.css';

const HomePageChrome: FC = () => {
	const {activeId, progress, isHeroOutOfView} = useHomePageChrome();

	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'});
	};

	return (
		<>
			<div
				aria-hidden='true'
				className={`${styles.scrollProgress} ${isHeroOutOfView ? styles.visible : ''}`}
				style={{transform: `scaleX(${progress})`}}
			/>
			<nav
				aria-label='По разделам главной страницы'
				className={`${styles.sectionNav} ${isHeroOutOfView ? styles.visible : ''}`}
			>
				<button
					type='button'
					className={styles.toTopButton}
					onClick={scrollToTop}
					aria-label='Прокрутить страницу наверх'
				>
					Наверх
				</button>
				<ol className={styles.sectionNavList}>
					{HOME_SECTION_NAV_LINKS.map((item) => {
						const isActive = activeId === item.id;
						return (
							<li key={item.id}>
								<a
									aria-current={isActive ? 'location' : undefined}
									className={`${styles.sectionNavLink} ${isActive ? styles.sectionNavLinkActive : ''}`}
									href={`#${item.id}`}
								>
									{item.label}
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
