import React from 'react';
import {useRouter} from 'next/router';
import styles from './BackButton.module.css';
import {FaArrowLeft} from "react-icons/fa";

interface BackButtonProps {
    label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({label = 'Вернуться назад'}) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className={styles.backButtonWrapper}>
            <button className={styles.backButton} onClick={handleBackClick}>
                <FaArrowLeft className={styles.arrowIcon}/>
                <span className={styles.tooltip}>{label}</span>
            </button>
        </div>
    );
};

export default BackButton;
