import {useCallback, useEffect, useState} from 'react';
import {MenuMobileProps} from '../interface/Menu.props';

function useMobileMenu(initialValue = false): Omit<MenuMobileProps, 'menu'> {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(initialValue);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);


    return {isMobileMenuOpen, toggleMobileMenu};
}

export default useMobileMenu;
