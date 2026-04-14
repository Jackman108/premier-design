export interface MenuItem {
    id: number;
    title: string;
    ruTitle: string;
}

export interface MenuProps {
    menu: MenuItem[];
    menuStyle: 'header' | 'footer' | 'mobile';
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
}
