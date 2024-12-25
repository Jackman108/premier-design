import {  useState } from 'react';
import {MenuMobileProps} from '../interface/Menu.props';

function useMobileMenu(initialValue = false): MenuMobileProps {
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
