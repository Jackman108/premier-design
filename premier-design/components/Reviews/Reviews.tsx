import React, {FC} from 'react';
import styles from './Reviews.module.css';
import Image from "next/image";
import {GetDataProps} from "../../interface/interfaceData";
import {findItemByTitle} from "../../utils/findItemByTitle";
import Title from "../UX/Title/Title";

const Reviews: FC<GetDataProps> = ({data}) => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(data.title, "customer_reviews") || {};

    return (
        <section className={styles.reviews}>
            <div className={styles.reviews__container}>
                <Title
                    titleStyle='title-black'
                    descriptionStyle='description-black'
                    title={title}
                    description={description}
                    shortTitle={shortTitle}
                />
                <div className={styles.reviews__content}>
                    {data.reviews.map((review) => (
                        <div key={review.id} className={styles.content__review}>
                            <Image
                                priority={false}
                                src={review.photoUrl}
                                alt={shortTitle}
                                quality={100}
                                width={600}
                                height={600}
                                placeholder='empty'
                                className={styles.content__photo}
                                loading={'lazy'}
                            />
                            <div className={styles.content__text}>
                                <p className={styles.content__quote}>{review.text}</p>
                                <p className={styles.content__author}>
                                    — {review.name}, {review.city}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
