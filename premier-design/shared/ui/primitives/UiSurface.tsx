import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import styles from './UiSurface.module.css';

export type UiSurfaceProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	variant?: 'default' | 'muted';
};

export const UiSurface = forwardRef<HTMLDivElement, UiSurfaceProps>(
	({ children, variant = 'default', className = '', ...rest }, ref) => {
		const tone = variant === 'muted' ? styles.muted : '';
		return (
			<div ref={ref} className={`${styles.root} ${tone} ${className}`.trim()} {...rest}>
				{children}
			</div>
		);
	},
);

UiSurface.displayName = 'UiSurface';
