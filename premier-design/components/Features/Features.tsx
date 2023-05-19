import NextImage from "next/image";
import styles from "./Features.module.css";
import { useMemo } from "react";

const Features = (
    { data }: { data: DataProps }
): JSX.Element => {
    const memoizedFeatures = useMemo(() => data.features, []);
    return (
        <section className={styles.features}>
            <div className={styles.features__container}>
                <div className={styles.features__list}>
                    {memoizedFeatures.map((feature) => (
                        <div className={styles.features__item} key={`feature_${feature.id}`}>
                            <NextImage
                                src={feature.icon}
                                alt={feature.title}
                                className={styles.features__icon}
                                width={40}
                                height={40}
                                loading='lazy'
                            />
                            <h3 className={styles.features__title}>{feature.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
