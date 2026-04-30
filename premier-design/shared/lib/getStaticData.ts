import { cache } from 'react';

import type { GetStaticProps } from 'next';

import { loadSiteData } from '@shared/site-data';
import type { DataProps } from '@shared/validates/dataPropsSchema';

export const getData = async (): Promise<DataProps> => {
	return loadSiteData();
};

/** Дедуп в пределах одного запроса RSC (`generateMetadata` + `page`). */
export const getCachedData = cache(getData);

export const getStaticProps: GetStaticProps<{ data: DataProps }> = async () => {
	const staticData: DataProps = await getData();

	return {
		props: {
			data: staticData,
		},
		revalidate: 3600,
	};
};
