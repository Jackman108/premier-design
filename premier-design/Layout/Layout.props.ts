import { ReactNode } from 'react';
import { DataProps } from '../interface/interfaceData';

export interface LayoutProps {
    children: ReactNode;
    data: DataProps;
}