import type {ReactElement} from 'react';
import styles from './SectionSkeleton.module.css';

/** Плейсхолдер для ленивых секций (`next/dynamic`) без резкого "прыжка" контента. */
const SectionSkeleton = (): ReactElement => (
	<div className={styles.root} aria-hidden="true">
		<div className={`${styles.line} ${styles.lineLg}`} />
		<div className={`${styles.line} ${styles.lineMd}`} />
		<div className={`${styles.line} ${styles.lineMd}`} />
		<div className={`${styles.line} ${styles.lineSm}`} />
	</div>
);

export default SectionSkeleton;
