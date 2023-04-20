import React from "react";
import styles from "./News.module.css";
import NewsProps from "./News.props";



function News({ news }: NewsProps): JSX.Element {
    return (
        <div className={styles.wrapperNews}>
            <div className={styles.footerTitle}>
                <h2>Новости</h2>
            </div>
            <div className={styles.footerContents}>
                {news.map((item, index) => (
                    <div className={styles.footerContent} key={index}>
                        <img src={item.image} alt="Logo" />
                        <div >
                            {item.date}
                            <br />
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
