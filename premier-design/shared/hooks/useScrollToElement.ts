import {useRef} from "react";

export const useScrollToElement = () => {
    const scrollToRef = useRef<HTMLDivElement>(null);

    const scrollToElement = (id: string) => {
        const element = document.querySelector(`#${id}`);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    };

    return {scrollToElement, scrollToRef};
};
