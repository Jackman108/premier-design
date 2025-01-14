import React, {FC} from 'react';
import styles from './Reviews.module.css';
import {findItemByTitle} from "../../utils/findItemByTitle";
import Title from "../UX/Title/Title";
import {ReviewsProps} from "../../interface/Review.props";
import useResizeEffects from "../../hooks/useResizeEffects";
import Slider from "../Slider/Slider";
import ReviewCard from "../Cards/ReviewCard/ReviewCard";

const Reviews: FC<ReviewsProps> = ({titles, reviews}) => {
    const {title = '', description = '', shortTitle = ''} = findItemByTitle(titles, "customer_reviews") || {};
    const {isMobile} = useResizeEffects();

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
                    {isMobile ? (
                        <Slider isMobile={isMobile} slidesPerView={1}>
                            {reviews.map((review) => (
                                <ReviewCard key={review.id} {...review} />
                            ))}
                        </Slider>
                    ) : (
                        reviews.map((review) => (
                            <ReviewCard key={review.id} {...review} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
