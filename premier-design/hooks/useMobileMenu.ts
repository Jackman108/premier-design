import {useCallback, useState} from 'react';
import {MenuMobileProps} from '../interface/Menu.props';

function useMobileMenu(initialValue = false): Omit<MenuMobileProps, 'menu'> {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(initialValue);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    return {isMobileMenuOpen, toggleMobileMenu};
}

export default useMobileMenu;
