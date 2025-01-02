'use client'
import {useEffect, useState} from 'react';
import useMobileMenu from './useMobileMenu';
import {UseResizeEffectsReturnType} from '../interface/Menu.props';

const MOBILE_BREAKPOINT = 768;

function useResizeEffects(): UseResizeEffectsReturnType {
    const {isMobileMenuOpen, toggleMobileMenu} = useMobileMenu(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = (): void => {
            const isWindowMobile = document.documentElement.clientWidth <= MOBILE_BREAKPOINT;
            if (isWindowMobile !== isMobile) {
                setIsMobile(isWindowMobile);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [toggleMobileMenu, isMobile]);

    return {isMobileMenuOpen, toggleMobileMenu, isMobile};
}

export default useResizeEffects;