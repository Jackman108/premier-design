import {useRouter} from 'next/router';

export const usePaperNavigation = () => {
    const router = useRouter();


    const handlePaperClick = async (shortTitle: string) => {
        await router.push(`/documents/${shortTitle}`);
    };

    return {handlePaperClick};
};
