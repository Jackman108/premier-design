import {  useState } from 'react';
import { MenuDataProps } from '../interface/MenuData.props';

function useMobileMenu(initialValue = false): MenuDataProps {
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
