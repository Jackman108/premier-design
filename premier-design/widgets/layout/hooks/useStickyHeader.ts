import {useEffect, useState} from 'react';

export const useStickyHeader = (threshold: number = 0.25) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsSticky(scrollY > window.innerHeight * threshold);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return {isSticky};
};
