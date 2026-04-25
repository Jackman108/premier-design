import type {DataProps} from '@shared/validates/dataPropsSchema';

/** Локальные «якорные» пути лендинга и юр. страниц; полный список для sitemap — **`collectSitePathnames`**. */
export const STATIC_SITEMAP_PATHS: readonly string[] = [
	'',
	'/repairs',
	'/services',
	'/design',
	'/portfolio',
	'/about',
	'/contacts',
	'/sitemap',
	'/documents/privacy-policy',
	'/documents/public-offer',
	'/documents/user-agreement',
];

/**
 * Все публичные pathname для **`sitemap.xml`**, HTML **`/sitemap`** и проверок: статика + **`/services`**, категории и позиции прайса + **`relatedServices[].canonical`**.
 */
export function collectSitePathnames(data: DataProps): string[] {
	const paths = new Set<string>(STATIC_SITEMAP_PATHS);

	for (const category of data.prices.repairs) {
		paths.add(`/services/${category.id}`);
		for (const item of category.priceList) {
			const tail = item.canonical.split('/').pop();
			if (tail) {
				paths.add(`/services/${category.id}/${tail}`);
			}
		}
	}

	for (const s of data.relatedServices) {
		paths.add(s.canonical);
	}

	return [...paths].sort((a, b) => a.localeCompare(b));
}
