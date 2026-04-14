import {useEffect} from "react";

export const useVisibilityObserver = (elementIdPrefix: string) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        if (id && id.startsWith(elementIdPrefix)) {
                            window.history.replaceState(null, '', window.location.pathname);
                        }
                    }
                });
            },
            {threshold: 1}
        );

        const elements = document.querySelectorAll(`[id^="${elementIdPrefix}"]`);
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [elementIdPrefix]);
};
