'use client';

import styles from './useFallback.module.css';

/** App Router: нет `router.isFallback`; индикатор загрузки fallback не используется. */
export const useFallback = (isDataAvailable: boolean) => {
	if (!isDataAvailable) {
		return <div className={styles.error}>Service not found.</div>;
	}

	return null;
};
