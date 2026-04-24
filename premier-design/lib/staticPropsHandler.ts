import {GetStaticProps} from 'next';
import {getData} from '@lib/getStaticData';
import {findRelatedService} from '@lib/findRelatedService';
import {findService} from '@lib/findService';
import {getCommonProps} from '@lib/getCommonProps';

/** SSG-обвязка для страниц услуг: `getData`, поиск сущностей и общие пропсы лейаута в `lib/`. */
export const staticPropsHandler = (isRelated = false): GetStaticProps => async ({params}) => {
	try {
		const data = await getData();
		if (!data) return {notFound: true};

		const {categoryId, serviceId} = params as {categoryId: string; serviceId?: string};

		const result = isRelated
			? findRelatedService(data, categoryId)
			: findService(data, categoryId, serviceId || '');

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
