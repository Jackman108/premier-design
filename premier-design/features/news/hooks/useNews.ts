import {useCallback, useEffect, useRef, useState} from "react";
import {NewsProps} from "@features/news/interface/News.props";
import {useModalState} from "@shared/hooks/useModalState";
import {useUrlHash} from "@shared/hooks/useUrlHash";
import {useScrollToElement} from "@shared/hooks/useScrollToElement";
import {useVisibilityObserver} from "@shared/hooks/useVisibilityObserver";

export const useNews = (news: NewsProps[]) => {
    const [expandedNews, setExpandedNews] = useState<number | null>(null);
    const {isOpen: showModal, toggleModal, closeModal} = useModalState(false);
    const {updateHash, resetHash} = useUrlHash();
    const {scrollToElement} = useScrollToElement();

    const newsRef = useRef<HTMLDivElement>(null);

    const handleNewsClick = useCallback(
        (index: number) => {
            if (expandedNews === index) {
                closeModal();
                setExpandedNews(null);

                resetHash();
                scrollToElement("news-list");
            } else {
                toggleModal();
                setExpandedNews(index);

                updateHash("news", index);
                scrollToElement(`news-${index}`);
            }
        },
        [expandedNews, toggleModal, closeModal, updateHash, resetHash, scrollToElement]
    );

    useVisibilityObserver("news-");

    // Синхронизация с hash при монтировании: не добавляем handleNewsClick в deps — повторный вызов
    // при смене expandedNews дублирует открытие модалки и ломает навигацию по списку.
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const index = parseInt(hash.substring(6), 10);
            if (!isNaN(index) && index >= 0 && index < news.length) {
                handleNewsClick(index);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- см. комментарий выше: не тянуть handleNewsClick в deps
    }, [news.length]);

    return {expandedNews, newsRef, handleNewsClick, showModal, closeModal};
};
