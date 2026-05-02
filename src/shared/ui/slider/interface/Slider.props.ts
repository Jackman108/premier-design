import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { KeyboardEvent, MouseEvent } from 'react';

export interface SliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode;
	slidesPerView: number;
	isMobile?: boolean;
}

export interface SliderArrowProps {
	disabled: boolean;
	left?: boolean;
	onActivate: (e: MouseEvent<SVGSVGElement> | KeyboardEvent<SVGSVGElement>) => void;
}
