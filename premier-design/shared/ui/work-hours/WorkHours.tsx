import React from 'react';
import styles from './WorkHours.module.css';

const WorkHours: React.FC = () => {
    return (
        <div className={styles.work__hours}>
            <span>Пн-Пт: 09:00 - 18:00</span>
        </div>
    );
};

export default WorkHours;
