import MenuItems from './MenuItems';

export interface MenuProps {
    MenuItems: typeof MenuItems;
    isMobileMenuOpen?: boolean;
    toggleMobileMenu?: () => void;
}