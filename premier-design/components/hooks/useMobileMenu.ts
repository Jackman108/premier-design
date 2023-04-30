import { useState } from 'react';
import { MenuProps } from '../Menu/MenuItems/MenuItems.props';

function useMobileMenu(initialValue:boolean = false): MenuProps {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(initialValue);

    function toggleMobileMenu(): void {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return {
        isMobileMenuOpen,
        toggleMobileMenu,
    };
} 

export default useMobileMenu;
