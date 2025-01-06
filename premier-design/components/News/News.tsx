/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {FC, ReactElement} from "react";
import NextImage from "next/image";
import Link from "next/link";
import {NewsComponentProps} from "../../interface/News.props";
import TextViewer from "../TextViewer/TextViewer";
import {useNews} from "../../hooks/useNews";
import {getNewsStyles} from "../../utils/getNewsStyles";

const News: FC<NewsComponentProps> = ({news, newsStyle}): ReactElement => {
    const stylesToUse = getNewsStyles(newsStyle);
    const {expandedNews, newsRef, handleNewsClick, showModal, closeModal} = useNews(news);

    return (
        <section className={stylesToUse.news}>
            <div className={stylesToUse.news__title}>
                <h2>Новости и Акции</h2>
            </div>
            <div className={stylesToUse.news__container}>
                {news.map((item, index) => (
                    <div
                        className={`${stylesToUse.news__content} ${expandedNews === index ? stylesToUse.expanded : ""
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
                                href={`/about/#news-${index}`}
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
                                        title={item.title}
                                        text={item.text}
                                        image={item.image}
                                        showModal={showModal}
                                        setShowModal={closeModal}
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
