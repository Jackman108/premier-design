import { cache } from 'react';

import data from '../data/data.json';
import type {GetStaticProps} from 'next';
import type {DataProps} from '@shared/validates/dataPropsSchema';
import {dataPropsSchema, formatDataPropsParseError} from '@shared/validates/dataPropsSchema';

export const getData = async (): Promise<DataProps> => {
	const parsed = dataPropsSchema.safeParse(data);
	if (!parsed.success) {
		throw new Error(`data/data.json: ${formatDataPropsParseError(parsed.error)}`);
	}
	return parsed.data;
};

/** Дедуп в пределах одного запроса RSC (`generateMetadata` + `page`). */
export const getCachedData = cache(getData);

export const getStaticProps: GetStaticProps<{data: DataProps}> = async () => {
	const staticData: DataProps = await getData();

	return {
		props: {
			data: staticData,
		},
		revalidate: 3600,
	};
};
