import data from '../data/data.json';
import type {GetStaticProps} from 'next';
import type {DataProps} from '@widgets/interface/interfaceData';
import {dataPropsSchema, formatDataPropsParseError} from '@shared/validates/dataPropsSchema';

export const getData = async (): Promise<DataProps> => {
	const parsed = dataPropsSchema.safeParse(data);
	if (!parsed.success) {
		throw new Error(`data/data.json: ${formatDataPropsParseError(parsed.error)}`);
	}
	// Zod выводит часть полей как Record/unknown[]; контракт страниц — DataProps (см. interfaceData).
	return parsed.data as unknown as DataProps;
};

export const getStaticProps: GetStaticProps<{data: DataProps}> = async () => {
	const staticData: DataProps = await getData();

	return {
		props: {
			data: staticData,
		},
		revalidate: 3600,
	};
};
