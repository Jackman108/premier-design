'use client';

import {useEffect, useState} from 'react';

import {HOME_SECTION_NAV_IDS} from '@lib/homeSectionNavConfig';
import {computeActiveHomeSectionId} from '../utils/computeActiveHomeSectionId';

const getScrollProgress = (): number => {
	if (typeof document === 'undefined') {
		return 0;
	}
	const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	if (scrollHeight <= 0) {
		return 0;
	}
	return Math.min(1, Math.max(0, window.scrollY / scrollHeight));
};

export function useHomePageChrome(): {activeId: string | null; progress: number; isHeroOutOfView: boolean} {
	const [progress, setProgress] = useState(0);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [isHeroOutOfView, setIsHeroOutOfView] = useState(false);

	useEffect(() => {
		const update = () => {
			setProgress(getScrollProgress());
			setActiveId(computeActiveHomeSectionId(HOME_SECTION_NAV_IDS, window.scrollY));
		};

		update();
		window.addEventListener('scroll', update, {passive: true});
		window.addEventListener('resize', update, {passive: true});
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	useEffect(() => {
		const hero = document.getElementById('home-hero');
		if (!hero) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				// Хром появляется, когда hero перестаёт быть заметен пользователю.
				setIsHeroOutOfView(!entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0.15,
			},
		);

		observer.observe(hero);
		return () => observer.disconnect();
	}, []);

	return {progress, activeId, isHeroOutOfView};
}
