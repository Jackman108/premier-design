import React from 'react';
import styles from './WorkHours.module.css';

interface WorkHoursProps {
    hours: string;
}

const WorkHours: React.FC<WorkHoursProps> = ({ hours }) => {
    return (
        <div className={styles.work__hours}>
            <span>{hours}</span>
        </div>
    );
};

export default WorkHours;
