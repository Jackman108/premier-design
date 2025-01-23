import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './ArrowButton.module.css';
import costingButton from '../../../public/arrow.svg';
import Image from 'next/image';

interface ArrowButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    onClick?: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = () => {
    return (
        <div className={styles.arrow__buttons}>
            <button className={styles.arrow__button} aria-label="Стрелка влево">
                <Image src={costingButton.src} alt="arrow" className={styles.arrow__left}/>
            </button>
            <button className={styles.arrow__button} aria-label="Стрелка вправо">
                <Image src={costingButton.src} alt="arrow" className={styles.arrow__right}/>
            </button>
        </div>

    );
};

export default ArrowButton;