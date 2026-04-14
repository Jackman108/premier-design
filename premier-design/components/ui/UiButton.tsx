import type {ButtonHTMLAttributes, FC} from 'react';

import styles from './UiButton.module.css';

export type UiButtonVariant = 'primary' | 'secondary' | 'ghost';

export type UiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: UiButtonVariant;
};

const variantClass: Record<UiButtonVariant, string> = {
	primary: styles.primary,
	secondary: styles.secondary,
	ghost: styles.ghost,
};

export const UiButton: FC<UiButtonProps> = ({
	variant = 'primary',
	className = '',
	type = 'button',
	children,
	...rest
}) => {
	const v = variantClass[variant] ?? variantClass.primary;
	return (
		<button className={`${styles.root} ${v} ${className}`.trim()} type={type} {...rest}>
			{children}
		</button>
	);
};
