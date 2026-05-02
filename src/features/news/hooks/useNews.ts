import { useCallback, useEffect, useRef, useState } from 'react';
import { NewsProps } from '@features/news/interface/News.props';
import { useModalState } from '@shared/hooks/useModalState';
import { useUrlHash } from '@shared/hooks/useUrlHash';
import { useScrollToElement } from '@shared/hooks/useScrollToElement';
import { useVisibilityObserver } from '@shared/hooks/useVisibilityObserver';

export type UseNewsOptions = {
	/** `false` — не открывать карточку по `location.hash` при монтировании (дубликат блока на странице). */
	syncHashOnMount?: boolean;
};

export const useNews = (news: NewsProps[], options: UseNewsOptions = {}) => {
	const { syncHashOnMount = true } = options;
	const [expandedNews, setExpandedNews] = useState<number | null>(null);
	const { isOpen: showModal, openModal, closeModal } = useModalState(false);
	const { updateHash, resetHash } = useUrlHash();
	const { scrollToElement } = useScrollToElement();

	const newsRef = useRef<HTMLDivElement>(null);

	const closeNewsModal = useCallback(() => {
		closeModal();
		setExpandedNews(null);
		resetHash();
		scrollToElement('news-list');
	}, [closeModal, resetHash, scrollToElement]);

	const handleNewsClick = useCallback(
		(index: number) => {
			if (expandedNews === index) {
				closeNewsModal();
			} else {
				openModal();
				setExpandedNews(index);

				updateHash('news', index);
				scrollToElement(`news-${index}`);
			}
		},
		[expandedNews, openModal, closeNewsModal, updateHash, scrollToElement],
	);

	useVisibilityObserver('news-');

	// Синхронизация с hash при монтировании: не добавляем handleNewsClick в deps — повторный вызов
	// при смене expandedNews дублирует открытие модалки и ломает навигацию по списку.
	useEffect(() => {
		if (!syncHashOnMount) {
			return;
		}
		const hash = window.location.hash;
		if (hash) {
			const index = parseInt(hash.substring(6), 10);
			if (!isNaN(index) && index >= 0 && index < news.length) {
				handleNewsClick(index);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- см. комментарий выше: не тянуть handleNewsClick в deps
	}, [news.length, syncHashOnMount]);

	return { expandedNews, newsRef, handleNewsClick, showModal, closeNewsModal };
};
