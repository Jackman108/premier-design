import React from 'react';
import styles from './BackButton.module.css';
import {FaArrowLeft} from "react-icons/fa";
import {BackButtonProps} from '@shared/ui/back-button/interface/BackButton.props';
import {useBackNavigation} from '@shared/ui/back-button/hooks/useBackNavigation';

const BackButton: React.FC<BackButtonProps> = ({label = 'Вернуться назад'}) => {
    const {handleBackClick} = useBackNavigation();

    return (
        <div className={styles.backButtonWrapper}>
            <button className={styles.backButton} onClick={handleBackClick} aria-label={label}>
                <FaArrowLeft className={styles.arrowIcon}/>
                <span className={styles.tooltip}>{label}</span>
            </button>
        </div>
    );
};

export default BackButton;
