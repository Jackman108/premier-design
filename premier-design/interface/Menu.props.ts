export interface MenuProps {
    id: number;
    title: string;
    ruTitle: string;
}

export interface MenuMobileProps {
    menu: MenuProps[];
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
}

export interface MenuStyleProps extends MenuMobileProps {
    menuStyle: 'header' | 'footer' | 'mobile';
}

export interface UseResizeEffectsReturnType {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    isMobile: boolean;
}

export interface ThemeButtonProps {
    currentTheme: string;
    toggleTheme: () => void;
}

