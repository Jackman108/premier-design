import type { NextPage } from 'next';
import type { ReactElement } from 'react';
import { RelatedServiceDetail, type RelatedServiceDetailProps } from '@features/related-services';
import { ServiceCategoryPage, type ServiceCategoryPageProps } from '@features/services';

/** Композиция маршрута `pages/services/[categoryId]`: категория прайса или карточка `relatedServices`. В `widgets/`, чтобы не тянуть cross-feature внутри `features/services`. */
export type ServicesTierPageProps =
	| ({ tierKind: 'repair' } & ServiceCategoryPageProps)
	| ({ tierKind: 'related' } & RelatedServiceDetailProps);

const ServicesTierPage: NextPage<ServicesTierPageProps> = (props): ReactElement => {
	if (props.tierKind === 'repair') {
		const { tierKind: _t, ...rest } = props;
		return <ServiceCategoryPage {...rest} />;
	}

	const { tierKind: _t, ...rest } = props;
	return <RelatedServiceDetail {...rest} />;
};

export default ServicesTierPage;
