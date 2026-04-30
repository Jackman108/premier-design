import type { DataProps } from '@shared/validates/dataPropsSchema';
import type { Category } from '@entities/service';
import { getCanonicalPath } from '@shared/utils/getCanonicalPath';

type RelatedEntry = NonNullable<DataProps['relatedServices']>[number];

export type ServicesTierResolution =
	| { kind: 'repair'; category: Category }
	| { kind: 'related'; relatedService: RelatedEntry };

/** Маршрут `/services/[categoryId]`: категория прайса или карточка «смежной» услуги (`relatedServices`). Категории прайса имеют приоритет при совпадении slug. */
export function resolveServicesTier(data: DataProps, categoryId: string): ServicesTierResolution | null {
	const repairCategory = data.prices?.repairs?.find((c) => c.id === categoryId);
	if (repairCategory) {
		return { kind: 'repair', category: repairCategory };
	}

	const relatedService = data.relatedServices?.find((s) => getCanonicalPath(s.canonical) === categoryId);
	if (relatedService) {
		return { kind: 'related', relatedService };
	}

	return null;
}
