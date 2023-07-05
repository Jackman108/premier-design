import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
export interface SliderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children: ReactNode;
    slidesPerView: number;
    isMobile: boolean;
}