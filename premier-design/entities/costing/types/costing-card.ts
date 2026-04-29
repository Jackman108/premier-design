import type { KeyboardEvent } from 'react';

export interface CostingCardProps {
	id: number;
	title: string;
	image: string;
	onClick?: () => void;
	onKeyDown?: (event: KeyboardEvent) => void;
	role?: string;
	tabIndex?: number;
	ariaLabel?: string;
}
