'use client';

import { useRouter } from 'next/navigation';

export const useBackNavigation = () => {
	const router = useRouter();

	const handleBackClick = () => {
		router.back();
	};

	return { handleBackClick };
};
