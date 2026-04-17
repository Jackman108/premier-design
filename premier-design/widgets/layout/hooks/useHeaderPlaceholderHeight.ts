'use client';

import {useLayoutEffect, useState, type RefObject} from 'react';

/**
 * Высота «липкого» хедера для плейсхолдера: при переносе меню на вторую строку
 * фиксированные 102px дают скачок контента — синхронизируем с фактическим `header`.
 */
export const useHeaderPlaceholderHeight = (
	headerRef: RefObject<HTMLElement | null>,
	isSticky: boolean,
): number | null => {
	const [heightPx, setHeightPx] = useState<number | null>(null);

	useLayoutEffect(() => {
		if (!isSticky) {
			setHeightPx(null);
			return;
		}

		const el = headerRef.current;
		if (!el) {
			return;
		}

		const apply = () => {
			setHeightPx(Math.round(el.getBoundingClientRect().height));
		};

		apply();
		const ro = new ResizeObserver(apply);
		ro.observe(el);
		return () => {
			ro.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps -- ref стабилен; пересчёт при смене isSticky
	}, [isSticky]);

	return heightPx;
};
