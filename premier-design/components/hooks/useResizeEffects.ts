import { useEffect, useState } from 'react';
import useMobileMenu from './useMobileMenu';
import useThemeToggle from './useThemeToggle';

function useResizeEffects() {
    const { currentTheme, toggleTheme } = useThemeToggle();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
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
