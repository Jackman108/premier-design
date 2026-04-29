import type {GetStaticPaths, GetStaticProps} from 'next';
import {getData} from '@lib/getStaticData';
import {getCommonProps} from '@lib/staticProps/getCommonProps';
import {resolveServicesTier} from '@lib/resolveServicesTier';
import {getCanonicalPath} from '@shared/utils/getCanonicalPath';

export const getServicesTierStaticPaths: GetStaticPaths = async () => {
	try {
		const data = await getData();
		if (!data) return {paths: [], fallback: false};

		const repairPaths = (data.prices?.repairs ?? []).map((c) => ({
			params: {categoryId: c.id},
		}));

		const relatedPaths = (data.relatedServices ?? []).map((s) => ({
			params: {categoryId: getCanonicalPath(s.canonical)},
		}));

		const seen = new Set(repairPaths.map((p) => p.params.categoryId));
		const paths = [...repairPaths];
		for (const p of relatedPaths) {
			const id = p.params.categoryId;
			if (id && !seen.has(id)) {
				paths.push(p);
				seen.add(id);
			}
		}

		return {paths, fallback: 'blocking'};
	} catch (error) {
		console.error(error);
		return {paths: [], fallback: false};
	}
};

export const getServicesTierStaticProps: GetStaticProps = async ({params}) => {
	try {
		const data = await getData();
		if (!data) return {notFound: true};

		const categoryId = params?.categoryId as string;
		const resolved = resolveServicesTier(data, categoryId);
		if (!resolved) return {notFound: true};

		if (resolved.kind === 'repair') {
			return {
				props: {
					...getCommonProps(data),
					tierKind: 'repair',
					category: resolved.category,
				},
				revalidate: 3600,
			};
		}

		return {
			props: {
				...getCommonProps(data),
				tierKind: 'related',
				relatedService: resolved.relatedService,
			},
			revalidate: 3600,
		};
	} catch (error) {
		console.error(error);
		return {notFound: true};
	}
};
