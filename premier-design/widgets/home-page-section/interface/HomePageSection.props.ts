import type {ReactNode} from 'react';

/**
 * Сетка и reveal для секций главной: `HomePage.module.css` + `data-reveal` для `useScrollReveal`.
 * `content` — типичный блок; `hero` / `features` — особые оболочки LCP/первой прокрутки.
 */
export type HomePageSectionLayout = 'hero' | 'features' | 'content';

export interface HomePageSectionProps {
	id?: string;
	'aria-label'?: string;
	layout: HomePageSectionLayout;
	/** `data-density` — только для `content`. */
	density?: 'compact';
	/** `data-width` — только для `content`. */
	width?: 'wide';
	className?: string;
	children: ReactNode;
}
