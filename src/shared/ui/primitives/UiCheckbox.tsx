import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

import styles from './UiCheckbox.module.css';

export type UiCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
	label: ReactNode;
	error?: ReactNode;
};

export const UiCheckbox = ({ label, error, className = '', id, ...rest }: UiCheckboxProps) => {
	const autoId = useId();
	const inputId = id ?? autoId;
	return (
		<div className={styles.wrap}>
			<div className={styles.row}>
				<input {...rest} type="checkbox" id={inputId} className={`${styles.input} ${className}`.trim()} />
				<label className={styles.label} htmlFor={inputId}>
					{label}
				</label>
			</div>
			{error ? <span className={styles.error}>{error}</span> : null}
		</div>
	);
};
