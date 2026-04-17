'use client';

import {createPortal} from 'react-dom';
import type {FC, ReactNode} from 'react';
import {useSyncExternalStore} from 'react';

type BodyPortalProps = {
	children: ReactNode;
};

const emptySubscribe = () => () => {};

const getBodySnapshot = (): HTMLElement | null =>
	typeof document !== 'undefined' ? document.body : null;

const getServerSnapshot = (): null => null;

/** Рендер в `document.body`, чтобы `position:fixed` и z-index не ограничивались предком (например, `ButtonsPanel`). */
export const BodyPortal: FC<BodyPortalProps> = ({children}) => {
	const target = useSyncExternalStore(emptySubscribe, getBodySnapshot, getServerSnapshot);

	if (!target) {
		return null;
	}

	return createPortal(children, target);
};
