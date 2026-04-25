'use client';

import {useEffect, useState} from 'react';

import {HOME_SECTION_SCROLL_SPY_ORDER} from '@lib/homeSectionNavConfig';
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
			setActiveId(computeActiveHomeSectionId(HOME_SECTION_SCROLL_SPY_ORDER, window.scrollY));
			/* Без getBoundingClientRect high hero + threshold 0.15 в IO могут держать «пересечение» и не давать
			 * .visible (opacity) боковой панели — считаем «после героя», когда низ баннера ушёл выше вьюпорта. */
			const hero = document.getElementById('home-hero');
			if (hero) {
				const {bottom} = hero.getBoundingClientRect();
				setIsHeroOutOfView(bottom < 0);
			} else {
				setIsHeroOutOfView(true);
			}
		};

		update();
		window.addEventListener('scroll', update, {passive: true});
		window.addEventListener('resize', update, {passive: true});
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	return {progress, activeId, isHeroOutOfView};
}
