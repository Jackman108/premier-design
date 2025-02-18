import NextImage from "next/image";
import styles from "./Features.module.css";
import {ReactElement, useMemo} from "react";
import {FeatureProps} from "../../interface/Feature.props";

const Features = (
    {features}: { features: FeatureProps[] }
): ReactElement => {
    const memoizedFeatures = useMemo(() => features, [features]);
    return (
        <section className={styles.features}>
            <div className={styles.features__container}>
                <div className={styles.features__list}>
                    {memoizedFeatures.map(({id, title, icon, iconPng}: FeatureProps) => (
                        <div className={styles.features__item} key={`id_${id}`}>
                            <NextImage
                                src={icon ? icon : iconPng}
                                alt={title}
                                className={styles.features__icon}
                                width={40}
                                height={40}
                                loading='lazy'
                            />
                            <h2 className={styles.features__title}>{title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
