import NextImage from "next/image";
import styles from "./News.module.css";

const News = ({ data
}: {
    data: DataProps
}
): JSX.Element => {
    return (
        <div className={styles.news}>
            <div className={styles.news__container}>
                <div className={styles.news__title}>
                    <h2>Новости</h2>
                </div>
                {data.news.map((news) => (
                    <div className={styles.news__content} key={news.id}>

                        <div className={styles.content__image}>
                            <NextImage
                                src={news.image}
                                alt={news.title}
                                width={40}
                                height={40}
                            />
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
