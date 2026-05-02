import { useMemo } from 'react';

import type { LayoutData } from '../interface/Layout.props';
import { buildLayoutProps, type BuildLayoutPropsOptions } from '../lib/buildLayoutProps';

export const useLayoutProps = (data: LayoutData, options: BuildLayoutPropsOptions = {}) => {
	const { headerVariant } = options;
	return useMemo(() => buildLayoutProps(data, { headerVariant }), [data, headerVariant]);
};
