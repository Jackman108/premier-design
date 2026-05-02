import { cache } from 'react';

import type { GetStaticProps } from 'next';

import type { SiteLocale } from '@shared/site-data';
import { loadSiteData } from '@shared/site-data';
import { resolveRequestSiteLocale } from '@shared/site-data/resolve-request-site-locale';
import type { DataProps } from '@shared/validates/dataPropsSchema';

export type CachedSiteBundle = {
	data: DataProps;
	siteLocale: SiteLocale;
};

/**
 * Одно чтение cookie локали + один бандл JSON на запрос RSC (страница, layout, loaders).
 * Используйте вместо пары **`Promise.all([getCachedData(), resolveRequestSiteLocale()])`**.
 */
export const getCachedSiteBundle = cache(async (): Promise<CachedSiteBundle> => {
	const siteLocale = await resolveRequestSiteLocale();
	return { siteLocale, data: loadSiteData(siteLocale) };
});

/** Дедуп в пределах одного запроса RSC (`generateMetadata` + `page`); локаль — cookie **`pd_site_locale`**. */
export async function getCachedData(): Promise<DataProps> {
	const { data } = await getCachedSiteBundle();
	return data;
}

export async function getCachedSiteLocale(): Promise<SiteLocale> {
	const { siteLocale } = await getCachedSiteBundle();
	return siteLocale;
}

export async function getData(): Promise<DataProps> {
	return getCachedData();
}

export const getStaticProps: GetStaticProps<{ data: DataProps }> = async () => {
	const staticData: DataProps = await getData();

	return {
		props: {
			data: staticData,
		},
		revalidate: 3600,
	};
};
