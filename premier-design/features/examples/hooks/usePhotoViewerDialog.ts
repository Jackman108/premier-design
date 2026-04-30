import { type RefObject, useEffect } from 'react';

/** Нативный `<dialog>` + `showModal()` / `close()` для top-layer; см. ADR 0003 (legacy). */
export const usePhotoViewerDialog = (dialogRef: RefObject<HTMLDialogElement | null>) => {
	useEffect(() => {
		const node = dialogRef.current;
		if (!node) {
			return;
		}
		if (typeof node.showModal === 'function') {
			node.showModal();
		} else {
			node.setAttribute('open', '');
		}
		node.focus();
		return () => {
			if (typeof node.close === 'function') {
				node.close();
			} else {
				node.removeAttribute('open');
			}
		};
		// Один раз при монтировании: ref стабилен, узел привязан к одному dialog.
		// eslint-disable-next-line react-hooks/exhaustive-deps -- см. PhotoViewer / ADR 0003
	}, []);
};
