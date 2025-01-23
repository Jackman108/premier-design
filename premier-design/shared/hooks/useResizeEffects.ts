'use client'
import {useEffect, useState} from 'react';
import useMobileMenu from '../../widgets/layout/hooks/useMobileMenu';
import {UseResizeEffectsProps} from "@shared/interface/UseResizeEffects.props";

const MOBILE_BREAKPOINT = 768;

function useResizeEffects(): UseResizeEffectsProps {
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