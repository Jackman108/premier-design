import { ReactNode } from 'react';
import { DataProps } from './interfaceData';

export interface LayoutProps {
    children: ReactNode;
    data: DataProps;
}