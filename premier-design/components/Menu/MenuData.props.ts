export interface MenuDataProps {
    data: {
        menu: MenuProps[];
    };
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
};

export interface MenuStyleProps extends MenuDataProps {
    menuStyle: 'header' | 'footer' | 'mobile';
}

export interface UseResizeEffectsReturnType {
    currentTheme: string;
    toggleTheme: () => void;
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    isMobile: boolean;
};

export interface ThemeButtonProps {
    currentTheme: string;
    toggleTheme: () => void;
};

