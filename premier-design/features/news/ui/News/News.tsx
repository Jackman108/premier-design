/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {FC, ReactElement} from "react";
import NextImage from "next/image";
import Link from "next/link";
import {NewsComponentProps} from "@features/news/interface/News.props";
import TextViewer from "@features/news/ui/TextViewer/TextViewer";
import {useNews} from "@features/news/hooks/useNews";
import {getNewsStyles} from "../../utils/getNewsStyles";
import Title from "@shared/ui/title/ui/Title";

const News: FC<NewsComponentProps> = ({title, news, newsStyle}): ReactElement => {
    const stylesToUse = getNewsStyles(newsStyle);
    const {expandedNews, newsRef, handleNewsClick, showModal, closeModal} = useNews(news);

    return (
        <section className={stylesToUse.news}>
            <div className={stylesToUse.news__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title?.title || ''}
                    description={title?.description || ''}
                    shortTitle={title?.shortTitle || ''}
                />
                <div className={stylesToUse.news__cards}>
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
                                    href={`/about#news-${index}`}
                                    className={stylesToUse.content__title}
                                    aria-label={`Перейти к разделу ${item.title}`}
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
            </div>
        </section>
    );
}

export default News;
