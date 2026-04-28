import {useEffect, useState} from 'react';

/**
 * Состояние промо-баннера (localStorage). Раньше была задержка `isReady` + setTimeout(100) —
 * баннер появлялся после первой отрисовки и давал заметный CLS в Lighthouse.
 */
export function useShareBanner() {
	const [isClosed, setIsClosed] = useState(false);

	useEffect(() => {
		try {
			if (localStorage.getItem('shareBannerClosed') === 'true') {
				// Чтение localStorage только на клиенте после монтирования — иначе расхождение SSR/гидрации.
				// eslint-disable-next-line react-hooks/set-state-in-effect -- синхронизация с хранилищем, не каскадный UI.
				setIsClosed(true);
			}
		} catch {
			// localStorage может быть недоступен (privacy mode и т.п.)
		}
	}, []);

	const handleClose = () => {
		setIsClosed(true);
		try {
			localStorage.setItem('shareBannerClosed', 'true');
		} catch {
			/* noop */
		}
	};

	return {
		isClosed,
		handleClose,
	};
}
