import { FC } from 'react';

import titleStyles from '@shared/ui/title/ui/Title.module.css';

import type { FaqSectionProps } from '../interface/FaqSection.props';
import styles from './FaqSection.module.css';

const FaqSection: FC<FaqSectionProps> = ({ sectionId, title, items }) => {
	if (!items.length) {
		return null;
	}

	return (
		<section id={sectionId} className={styles.section} aria-labelledby={`${sectionId}-heading`}>
			<h2 id={`${sectionId}-heading`} className={titleStyles['title-black']}>
				{title.title}
			</h2>
			<p className={titleStyles['description-black']}>{title.description}</p>
			<ul className={styles.list}>
				{items.map((item) => (
					<li key={item.id}>
						<details className={styles.details}>
							<summary className={styles.summary}>{item.question}</summary>
							<p className={styles.answer}>{item.answer}</p>
						</details>
					</li>
				))}
			</ul>
		</section>
	);
};

export default FaqSection;
