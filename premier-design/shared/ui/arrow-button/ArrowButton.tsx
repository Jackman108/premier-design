import React from 'react';
import styles from './ArrowButton.module.css';
import costingButton from '../../../public/arrow.svg';
import Image from 'next/image';

const ArrowButton: React.FC = () => {
    return (
        <div className={styles.arrow__buttons}>
            <button className={styles.arrow__button} aria-label="Стрелка влево">
                <Image
                    src={costingButton.src}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.arrow__left}
                />
            </button>
            <button className={styles.arrow__button} aria-label="Стрелка вправо">
                <Image
                    src={costingButton.src}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.arrow__right}
                />
            </button>
        </div>

    );
};

export default ArrowButton;