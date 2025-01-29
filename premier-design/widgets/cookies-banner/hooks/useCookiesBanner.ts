import { useEffect } from "react";

export function useCookiesBanner(openModal: () => void, closeModal: () => void) {
    useEffect(() => {
        try {
            const cookiesAccepted = localStorage.getItem("cookiesAccepted");
            if (cookiesAccepted === "false") {
                openModal();
            } else if (cookiesAccepted !== "true") {
                openModal();
            }
        } catch (error) {
            console.error("Ошибка при доступе к localStorage:", error);
        }
    }, [openModal]);

    const handleAction = (accepted: boolean) => {
        try {
            localStorage.setItem("cookiesAccepted", accepted ? "true" : "false");
        } catch (error) {
            console.error("Ошибка при записи в localStorage:", error);
        }
        closeModal();
    };

    return { handleAction };
}

export function usePrivacyPolicy(privacyPolicy: { shortTitle: string }, handlePaperClick: (title: string) => void) {
    const handlePrivacyPolicyClick = async () => {
        if (privacyPolicy) {
            try {
                handlePaperClick(privacyPolicy.shortTitle);
            } catch (error) {
                console.error("Ошибка при переходе к политике конфиденциальности:", error);
            }
        }
    };

    return { handlePrivacyPolicyClick };
}
