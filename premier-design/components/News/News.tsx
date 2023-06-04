'use client'
import NextImage from "next/image";
import footerStyles from "./footerNews.module.css";
import aboutStyles from "./aboutNews.module.css";
import bodyStyles from "./bodyNews.module.css";
import { NewsProps } from "../../interface/interfaceData";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import TextViewer from "../TextViewer/TextViewer";
import Link from "next/link";
export interface NewsStyleProps {
    newsStyle: 'about' | 'footer' | 'body';
}
interface NewsComponentProps {
    news: NewsProps[];
    newsStyle: NewsStyleProps['newsStyle'];
}
const getNewsStyles = (newsStyle: NewsStyleProps['newsStyle']) => {
    switch (newsStyle) {
        case 'footer':
            return footerStyles;
        case 'about':
            return aboutStyles;
        default:
            return bodyStyles;
    }
};

const News: FC<NewsComponentProps> = (
    { news, newsStyle }
): JSX.Element => {
    const stylesToUse = getNewsStyles(newsStyle);
    const [expandedNews, setExpandedNews] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const newsRef = useRef<HTMLDivElement>(null);

    const handleNewsClick = useCallback(
        (index: number) => {
            if (expandedNews === index) {
                setShowModal(false);
                setExpandedNews(null);
                if (newsRef.current) {
                    newsRef.current.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                setShowModal(true);
                setExpandedNews(index);
                if (newsRef.current) {
                    const newsElement = newsRef.current.querySelector(`#news-${index}`);
                    if (newsElement) {
                        newsElement.scrollIntoView({ behavior: "smooth" });
                    }
                }
            }
        },
        [expandedNews]
    );
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const index = parseInt(hash.substring(6), 10);
            if (!isNaN(index) && index >= 0 && index < news.length) {
                handleNewsClick(index);
            }
        }
    }, []);
    return (
        <section className={stylesToUse.news}>
            <div className={stylesToUse.news__title}>
                <h2>Новости</h2>
            </div>
            <div className={stylesToUse.news__container}>
                {news.map((item, index) => (
                    <div
                        className={`${stylesToUse.news__content} ${
                            expandedNews === index ? stylesToUse.expanded : ""
                            }`}
                        key={item.id}
                        onClick={() => handleNewsClick(index)}
                        ref={expandedNews === index ? newsRef : null}
                    >
                        <div
                            className={stylesToUse.content__image}
                        >
                            <NextImage
                                src={item.image}
                                alt={item.title}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={stylesToUse.content__wrapper}>
                            <Link 
                            href={`about/#news-${index}`}
                            className={stylesToUse.content__title}
                            >
                                {item.title}
                            </Link>
                            <div className={stylesToUse.content__date}>
                                {item.date}
                            </div>
                            <div
                                id={`news-${index}`}
                                className={stylesToUse.content__text}
                            >
                                {expandedNews === index && showModal ? (
                                    <TextViewer
                                        text={item.text}
                                        image={item.image}
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                    />
                                ) : (
                                    item.text
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default News;
