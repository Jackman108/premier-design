import { useEffect, useState } from 'react';
import useMobileMenu from './useMobileMenu';
import useThemeToggle from './useThemeToggle';
import { UseResizeEffectsReturnType } from '../Menu/MenuData.props';

const MOBILE_BREAKPOINT = 768;

function useResizeEffects(): UseResizeEffectsReturnType {
    const { currentTheme, toggleTheme } = useThemeToggle();
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = (): void => {
            const isWindowMobile = document.documentElement.clientWidth <= MOBILE_BREAKPOINT;
            if (isWindowMobile !== isMobile) {
                setIsMobile(isWindowMobile);
                if (isWindowMobile) {
                    toggleMobileMenu?.();
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },  [ toggleMobileMenu]);

    return { currentTheme, toggleTheme, isMobileMenuOpen, toggleMobileMenu, isMobile };
}

export default useResizeEffects;
