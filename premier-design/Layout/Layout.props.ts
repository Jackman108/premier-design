import { ReactNode } from 'react';
import { DataProps } from '../pages/[types]/Data';

export interface LayoutProps {
    children: ReactNode;
    data: DataProps;
}