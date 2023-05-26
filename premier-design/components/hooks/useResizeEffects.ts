import { useEffect, useState } from 'react';
import useMobileMenu from './useMobileMenu';
import { UseResizeEffectsReturnType } from '../Menu/MenuData.props';

const MOBILE_BREAKPOINT = 768;

function useResizeEffects(): UseResizeEffectsReturnType {
    const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = (): void => {
            const isWindowMobile = document.documentElement.clientWidth <= MOBILE_BREAKPOINT;
            if (isWindowMobile !== isMobile) {
                console.log("isMobile changed:", isWindowMobile);
                setIsMobile(isWindowMobile);
                if (isWindowMobile) {
                    toggleMobileMenu?.();
                }
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },  [ toggleMobileMenu]);

    return { isMobileMenuOpen, toggleMobileMenu, isMobile };
}

export default useResizeEffects;