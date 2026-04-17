import {FC} from 'react';
import Image from 'next/image';

import {TrustSignalsProps} from '../interface/TrustSignals.props';
import {useTrustSignalsTracking} from '../hooks/useTrustSignalsTracking';
import styles from './TrustSignals.module.css';

const TrustSignals: FC<TrustSignalsProps> = ({reviews, features}) => {
    const {sectionRef, handleMetricInteraction, handleBenefitInteraction} = useTrustSignalsTracking();
    const featuredReviews = reviews.slice(0, 3);
    const trustMetrics = [
        {label: 'Проектов завершено', value: '150+'},
        {label: 'Средний рейтинг клиентов', value: '4.9 / 5'},
        {label: 'Гарантия на работы', value: '24 месяца'},
    ];

    return (
        <section ref={sectionRef} className={styles.section} aria-labelledby='trust-signals-title'>
            <div className={styles.header}>
                <p className={styles.eyebrow}>Почему нам доверяют</p>
                <h2 id='trust-signals-title' className={styles.title}>Почему нам доверяют сложные проекты</h2>
                <p className={styles.description}>
                    Репутация строится на прозрачном процессе, стабильном качестве и подтвержденном опыте.
                </p>
            </div>

            <div className={styles.metrics}>
                {trustMetrics.map((metric) => (
                    <article
                        key={metric.label}
                        className={styles.metricCard}
                        role='button'
                        tabIndex={0}
                        onClick={() => handleMetricInteraction(metric.label)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleMetricInteraction(metric.label);
                            }
                        }}
                    >
                        <p className={styles.metricValue}>{metric.value}</p>
                        <p className={styles.metricLabel}>{metric.label}</p>
                    </article>
                ))}
            </div>

            <div className={styles.benefits}>
                {features.map((feature) => (
                    <article
                        key={feature.id}
                        className={styles.benefitCard}
                        role='button'
                        tabIndex={0}
                        onClick={() => handleBenefitInteraction(feature.title)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                handleBenefitInteraction(feature.title);
                            }
                        }}
                    >
                        <Image
                            src={feature.icon}
                            alt={feature.title}
                            width={48}
                            height={48}
                            className={styles.benefitIcon}
                        />
                        <p>{feature.title}</p>
                    </article>
                ))}
            </div>

            <div className={styles.reviewsGrid}>
                {featuredReviews.map((review) => (
                    <article key={review.id} className={styles.reviewCard}>
                        <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                        <p className={styles.reviewMeta}>{review.name}, {review.city}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default TrustSignals;

