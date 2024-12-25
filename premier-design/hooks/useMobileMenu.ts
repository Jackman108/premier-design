import {  useState } from 'react';
import { MenuProps } from '../interface/Menu.props';

function useMobileMenu(initialValue = false): MenuProps {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(initialValue);

    function toggleMobileMenu(): void {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return {
        data: {
            menu: []
        },
        isMobileMenuOpen,
        toggleMobileMenu,
    };
}

export default useMobileMenu;
