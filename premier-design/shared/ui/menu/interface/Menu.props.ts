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
    /** Прозрачный хедер поверх hero: светлые пункты меню для контраста */
    headerOnHero?: boolean;
}
