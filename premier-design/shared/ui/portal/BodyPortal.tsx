'use client';

import { createPortal } from 'react-dom';
import type { FC } from 'react';

import type { BodyPortalProps } from '@shared/ui/portal/interface/BodyPortal.props';

/** Рендер в `document.body`, чтобы `position:fixed` и z-index не ограничивались предком (например, `ButtonsPanel`). */
export const BodyPortal: FC<BodyPortalProps> = ({ children }) => {
	if (typeof document === 'undefined') {
		return null;
	}
	return createPortal(children, document.body);
};
