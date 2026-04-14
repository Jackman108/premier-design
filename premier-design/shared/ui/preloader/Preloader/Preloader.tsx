import React, {ReactElement} from 'react';
import styles from './Preloader.module.css';


const Preloader = (): ReactElement => {
    return (
        <section className={styles.preloader}>
            <div className={styles.preloader__dot}></div>
            <div className={styles.preloader__dot}></div>
            <div className={styles.preloader__dot}></div>
            <div className={styles.preloader__dot}></div>
        </section>
    );
};
export default Preloader;
