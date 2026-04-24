import { useEffect, useState, useCallback } from 'react';
import {useViewportMobile} from '@shared/hooks/useViewportMobile';

export const useStickyHeader = (threshold: number = 0.25) => {
    const [isSticky, setIsSticky] = useState(false);
    const {isMobile} = useViewportMobile();

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const newIsSticky = scrollY > window.innerHeight * threshold;

        if (!isMobile && newIsSticky !== isSticky) {
            setIsSticky(newIsSticky);
        }
    }, [isSticky, threshold, isMobile]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        queueMicrotask(() => handleScroll());
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return { isSticky };
};
