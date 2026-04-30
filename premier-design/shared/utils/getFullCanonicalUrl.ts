import { SITE_PUBLIC_ORIGIN } from '@shared/constants/company';

export const getFullCanonicalUrl = (canonical: string): string => {
	return `${SITE_PUBLIC_ORIGIN}${canonical}`;
};
