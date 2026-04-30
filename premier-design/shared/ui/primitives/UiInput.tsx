import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import styles from './UiInput.module.css';

export type UiInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	label?: ReactNode;
	hint?: ReactNode;
	error?: ReactNode;
};

export const UiInput = forwardRef<HTMLInputElement, UiInputProps>(
	({ label, hint, error, className = '', id, ...rest }, ref) => {
		const autoId = useId();
		const inputId = id ?? autoId;
		return (
			<div className={styles.wrap}>
				{label ? (
					<label className={styles.label} htmlFor={inputId}>
						{label}
					</label>
				) : null}
				<input ref={ref} id={inputId} className={`${styles.input} ${className}`.trim()} {...rest} />
				{error ? <span className={styles.error}>{error}</span> : null}
				{!error && hint ? <span className={styles.hint}>{hint}</span> : null}
			</div>
		);
	},
);

UiInput.displayName = 'UiInput';
