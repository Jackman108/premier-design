// hooks/useModalState.ts
import {useCallback, useState} from "react";

export const useModalState = (initialState: boolean = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return {isOpen, openModal, closeModal};
};
