import { GetStaticPaths } from 'next';
import { getData } from '@shared/lib/getStaticData';
import { getCanonicalPath } from '@shared/utils/getCanonicalPath';

/** SSG-пути для **`pages/services/[categoryId]/[serviceId]`** (позиции прайса). Сегмент **`[categoryId]`** без `[serviceId]` — см. **`getServicesTierStaticPaths`**. */
export const staticPathsHandler = (): GetStaticPaths => async () => {
	try {
		const data = await getData();
		if (!data) return { paths: [], fallback: false };

		const paths =
			(data.prices?.repairs || []).flatMap((category) =>
				(category.priceList || []).map((item) => ({
					params: {
						categoryId: category.id,
						serviceId: getCanonicalPath(item.canonical),
					},
				})),
			) || [];

		return { paths, fallback: 'blocking' };
	} catch (error) {
		console.error(error);
		return { paths: [], fallback: false };
	}
};
