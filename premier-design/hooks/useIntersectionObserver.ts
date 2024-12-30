import {RefObject, useEffect, useMemo, useState} from 'react';

const useIntersectionObserver = (ref: RefObject<HTMLElement>, threshold = 1): boolean => {
    const [isVisible, setIsVisible] = useState(false);

    const observerCallback = useMemo(() => {
        return (entries: IntersectionObserverEntry[]) => {
            const visibleEntry = entries.find(entry => entry.isIntersecting);
            setIsVisible(!!visibleEntry);
        };
    }, []);

    useEffect(() => {
        const containerNode = ref.current;
        if (!containerNode) return;

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '0px',
            threshold
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(containerNode);

        return () => {
            observer.unobserve(containerNode);
        };
    }, [observerCallback, threshold, ref]);

    return isVisible;
};

export default useIntersectionObserver;
