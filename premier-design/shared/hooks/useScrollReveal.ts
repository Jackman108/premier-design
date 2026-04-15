import {useEffect} from "react";

const REVEAL_SELECTOR = '[data-reveal="true"]';

export const useScrollReveal = () => {
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

        if (elements.length === 0) {
            return;
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion || typeof IntersectionObserver === 'undefined') {
            elements.forEach((element) => {
                element.dataset.revealVisible = 'true';
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('data-reveal-visible', 'true');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px',
            },
        );

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, []);
};
