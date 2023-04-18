import { useState } from 'react';

function useMobileMenu(initialValue:boolean = false) {
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
