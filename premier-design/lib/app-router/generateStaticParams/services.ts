import { getCachedData } from '@lib/getStaticData';
import { getCanonicalPath } from '@shared/utils/getCanonicalPath';

export async function generateStaticParamsServiceDetail() {
	const data = await getCachedData();
	return (data.prices?.repairs ?? []).flatMap((category) =>
		(category.priceList ?? []).map((item) => ({
			categoryId: category.id,
			serviceId: getCanonicalPath(item.canonical),
		})),
	);
}

export async function generateStaticParamsServicesTier() {
	const data = await getCachedData();
	const repairPaths = (data.prices?.repairs ?? []).map((c) => ({
		categoryId: c.id,
	}));
	const relatedPaths = (data.relatedServices ?? []).map((s) => ({
		categoryId: getCanonicalPath(s.canonical),
	}));
	const seen = new Set(repairPaths.map((p) => p.categoryId));
	const paths = [...repairPaths];
	for (const p of relatedPaths) {
		const id = p.categoryId;
		if (id && !seen.has(id)) {
			paths.push(p);
			seen.add(id);
		}
	}
	return paths;
}
