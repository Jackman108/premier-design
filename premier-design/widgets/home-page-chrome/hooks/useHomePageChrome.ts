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

export function useHomePageChrome(): {activeId: string | null; progress: number} {
	const [progress, setProgress] = useState(0);
	const [activeId, setActiveId] = useState<string | null>(null);

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

	return {progress, activeId};
}
