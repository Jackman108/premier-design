import { useEffect } from 'react';
import useMobileMenu from './useMobileMenu';
import useThemeToggle from './useThemeToggle';

function useHeaderEffects() {
    const { currentTheme, toggleTheme } = useThemeToggle();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                toggleMobileMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { currentTheme, toggleTheme, isMobileMenuOpen, toggleMobileMenu };
}

export default useHeaderEffects;
