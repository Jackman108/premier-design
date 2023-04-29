import MenuItems from './MenuItems';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    MenuItems: typeof MenuItems;
    isMobileMenuOpen?: boolean;
    toggleMobileMenu?: () => void;
}