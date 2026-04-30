import type { DataProps } from '@shared/validates/dataPropsSchema';
import { getCanonicalPath } from '@shared/utils/getCanonicalPath';

/** Поиск связанной услуги для SSG. См. `lib/staticProps/findService.ts`. */
export const findRelatedService = (data: DataProps, categoryId: string) => {
	if (!data.relatedServices) {
		throw new Error('No related services data found');
	}

	const relatedService = data.relatedServices.find((service) => getCanonicalPath(service.canonical) === categoryId);
	if (!relatedService) {
		throw new Error(`Related service with id ${categoryId} not found`);
	}

	return { relatedService };
};
