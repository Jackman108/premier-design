import React from 'react';
import styles from './WorkHours.module.css';
import { SITE_OPERATOR } from '@shared/constants/company';

const WorkHours: React.FC = () => {
	return (
		<div className={styles.work__hours}>
			<span>{SITE_OPERATOR.workHours.summary}</span>
		</div>
	);
};

export default WorkHours;
