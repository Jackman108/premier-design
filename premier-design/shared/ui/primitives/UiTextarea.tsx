import type {ReactNode, TextareaHTMLAttributes} from 'react';
import {forwardRef, useId} from 'react';

import styles from './UiTextarea.module.css';

export type UiTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
	label?: ReactNode;
	hint?: ReactNode;
	error?: ReactNode;
};

export const UiTextarea = forwardRef<HTMLTextAreaElement, UiTextareaProps>(
	({label, hint, error, className = '', id, ...rest}, ref) => {
		const autoId = useId();
		const inputId = id ?? autoId;
		return (
			<div className={styles.wrap}>
				{label ? (
					<label className={styles.label} htmlFor={inputId}>
						{label}
					</label>
				) : null}
				<textarea ref={ref} id={inputId} className={`${styles.textarea} ${className}`.trim()} {...rest} />
				{error ? <span className={styles.error}>{error}</span> : null}
				{!error && hint ? <span className={styles.hint}>{hint}</span> : null}
			</div>
		);
	},
);

UiTextarea.displayName = 'UiTextarea';
