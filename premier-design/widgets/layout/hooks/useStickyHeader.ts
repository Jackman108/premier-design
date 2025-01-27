import { useEffect, useState, useCallback } from 'react';
import useResizeEffects from "@shared/hooks/useResizeEffects";

export const useStickyHeader = (threshold: number = 0.25) => {
    const [isSticky, setIsSticky] = useState(false);
    const {isMobile} = useResizeEffects();

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const newIsSticky = scrollY > window.innerHeight * threshold;

        if (!isMobile && newIsSticky !== isSticky) {
            setIsSticky(newIsSticky);
        }
    }, [isSticky, threshold, isMobile]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return { isSticky };
};
