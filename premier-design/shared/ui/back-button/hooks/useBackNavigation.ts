import {useRouter} from 'next/router';

export const useBackNavigation = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return {handleBackClick};
};
