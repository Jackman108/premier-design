import { useEffect, useState } from 'react';
import useMobileMenu from './useMobileMenu';
import useThemeToggle from './useThemeToggle';
import { UseResizeEffectsReturnType } from '../Menu/MenuData/MenuData.props';

function useResizeEffects(): UseResizeEffectsReturnType {
    const { currentTheme, toggleTheme } = useThemeToggle();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            const MOBILE_BREAKPOINT = 768;
            if (window.innerWidth > MOBILE_BREAKPOINT) {
                setIsMobile(false);
                toggleMobileMenu && toggleMobileMenu();
            } else {
                setIsMobile(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { currentTheme, toggleTheme, isMobileMenuOpen, toggleMobileMenu, isMobile };
}

export default useResizeEffects;
