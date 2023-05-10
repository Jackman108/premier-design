import styles from "./Features.module.css";

const Features = ({ data }: { data: DataProps }): JSX.Element => {
    return (
        <section className={styles.features}>
            <div className={styles.features__container}>
                <div className={styles.features__list}>
                    {data.features.map((feature) => (
                        <div className={styles.features__item} key={feature.id}>
                            <img src={feature.icon} alt={feature.title} className={styles.features__icon} />
                            <h3 className={styles.features__title}>{feature.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
