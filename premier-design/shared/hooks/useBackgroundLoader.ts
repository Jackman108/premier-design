import {  useEffect } from 'react';

export function useBackgroundLoader() {

    useEffect(() => {
        const img = new Image();
        img.src = '/tools.svg';
        img.onload = () => {
            document.body.style.backgroundImage = `url(/tools.svg)`;
            document.body.style.backgroundRepeat = 'repeat';
            document.body.style.backgroundSize = '18%';
        };
    }, []);
}
