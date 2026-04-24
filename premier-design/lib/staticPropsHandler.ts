import {GetStaticProps} from 'next';
import {getData} from '@lib/getStaticData';
import {findService} from '@lib/findService';
import {getCommonProps} from '@lib/getCommonProps';

/** SSG для **`pages/services/[categoryId]/[serviceId]`**: детальная позиция прайса + общие пропсы лейаута. */
export const staticPropsHandler = (): GetStaticProps => async ({params}) => {
	try {
		const data = await getData();
		if (!data) return {notFound: true};

		const {categoryId, serviceId} = params as {categoryId: string; serviceId?: string};

		const result = findService(data, categoryId, serviceId || '');

		if (!result) return {notFound: true};

		return {
			props: {
				...result,
				...getCommonProps(data),
			},
			revalidate: 3600,
		};
	} catch (error) {
		console.error(error);
		return {notFound: true};
	}
};
