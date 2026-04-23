import {useRouter} from "next/router";
import styles from './useFallback.module.css';

export const useFallback = (isDataAvailable: boolean) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div className={styles.loader}>Подгружаем данные...</div>;
    }

    if (!isDataAvailable) {
        return <div className={styles.error}>Service not found.</div>;
    }

    return null;
};
