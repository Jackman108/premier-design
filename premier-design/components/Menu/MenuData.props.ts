import { MenuProps } from "../../interface/interfaceData";

export interface MenuDataProps {
    data: {
        menu: MenuProps[];
    };
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
}

export interface MenuStyleProps extends MenuDataProps {
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

