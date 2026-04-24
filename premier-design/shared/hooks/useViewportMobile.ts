'use client';

import {useEffect, useState} from 'react';

const MOBILE_BREAKPOINT = 768;

/** Только breakpoint окна; без состояния меню — для фич и `shared` без импорта `widgets`. */
export function useViewportMobile(): {isMobile: boolean} {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = (): void => {
			setIsMobile(document.documentElement.clientWidth <= MOBILE_BREAKPOINT);
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {isMobile};
}
