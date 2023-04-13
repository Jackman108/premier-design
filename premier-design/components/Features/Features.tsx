import React from "react";
import styles from "./Features.module.css";
import FeaturesList from "./FeaturesList";

const Features: React.FC = () => {
    return (
        <section className={styles.features}>
            <div className={styles.container}>
                <h2 className={styles.title}>Наши преимущества</h2>
                <div className={styles.list}>
                    {FeaturesList.map((feature) => (
                        <div className={styles.item} key={feature.title}>
                            <img src={feature.icon} alt={feature.title} className={styles.icon} />
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.description}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
