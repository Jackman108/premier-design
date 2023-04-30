import { DetailedHTMLProps, HTMLAttributes } from 'react';
export interface MenuItem {
    id: number;
    title: string;
    ruTitle: string;
}
export interface MenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data?: {
        menu: MenuItem[];
    };
    isMobileMenuOpen?: boolean;
    toggleMobileMenu?: () => void;
}
