import {useCallback} from "react";

export const useUrlHash = () => {
    const updateHash = useCallback((section: string, index: number) => {
        window.location.hash = `#${section}-${index}`;
    }, []);

    const resetHash = useCallback(() => {
        window.history.replaceState(null, '', window.location.pathname);
    }, []);

    return {updateHash, resetHash};
};
