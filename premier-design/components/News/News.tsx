import React from "react";
import styles from "./News.module.css";
import NewsProps from "./News.props";



function News({ data }: NewsProps): JSX.Element {
    return (
        <div className={styles.news}>
            <div className={styles.news__container}>
                <div className={styles.news__title}>
                    <h2>Новости</h2>
                </div>
                {data.news.map((news) => (
                    <div className={styles.news__content} key={news.id}>

                        <div className={styles.content__image}>
                            <img src={news.image} alt={news.title} />
                        </div>
                        <div className={styles.content__wrapper}>
                            <div className={styles.content__title}>
                                {news.title}
                            </div>
                            <div className={styles.content__date}>
                                {news.date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
