import { useState, useEffect } from 'react';

export function useShareBanner() {
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const closedBanner = localStorage.getItem('shareBannerClosed');
        if (closedBanner === 'true') {
            setIsClosed(true);
        }
    }, []);

   const handleClose = () => {
        setIsClosed(true);
        localStorage.setItem('shareBannerClosed', 'true');
    };

    return {
        isClosed,
        handleClose
    };
}
