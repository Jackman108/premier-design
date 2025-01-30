import {useEffect, useState} from 'react';

export function useShareBanner() {
    const [isClosed, setIsClosed] = useState(false);
    const [isReady, setIsReady] = useState(false); // Состояние для задержки

    useEffect(() => {
        const closedBanner = localStorage.getItem('shareBannerClosed');
        if (closedBanner === 'true') {
            setIsClosed(true);
        }

        const timeout = setTimeout(() => {
            setIsReady(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const handleClose = () => {
        setIsClosed(true);
        localStorage.setItem('shareBannerClosed', 'true');
    };

    return {
        isClosed,
        isReady,
        handleClose
    };
}
