import { useState } from 'react';
import { MenuDataProps } from '../Menu/MenuData/MenuData.props';

function useMobileMenu(initialValue:boolean = false): MenuDataProps {
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
