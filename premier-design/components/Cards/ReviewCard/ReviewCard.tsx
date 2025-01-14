import React, {ReactElement} from 'react';
import Image from "next/image";
import styles from './ReviewCard.module.css';
import {Review} from "../../../interface/Review.props";

const ReviewCard: React.FC<Review> = (review): ReactElement => {
    return (
        <div key={review.id} className={styles.item}>
            <Image
                priority={false}
                src={review.photoUrl}
                alt={review.name}
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
    );
};

export default ReviewCard;
