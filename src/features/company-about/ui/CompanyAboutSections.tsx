import { FC } from 'react';

import type { CompanyAboutSectionsProps } from '../interface/CompanyAboutSections.props';
import styles from './CompanyAboutSections.module.css';

const CompanyAboutSections: FC<CompanyAboutSectionsProps> = ({ content }) => (
	<div className={styles.wrap}>
		<p className={styles.intro}>{content.intro}</p>

		<section aria-labelledby="about-milestones-title">
			<h2 id="about-milestones-title" className={styles.blockTitle}>
				{content.milestonesTitle}
			</h2>
			<ul className={styles.list}>
				{content.milestones.map((m) => (
					<li key={m.year} className={styles.milestone}>
						<div className={styles.year}>{m.year}</div>
						<p className={styles.text}>{m.text}</p>
					</li>
				))}
			</ul>
		</section>

		<section aria-labelledby="about-team-title">
			<h2 id="about-team-title" className={styles.blockTitle}>
				{content.teamTitle}
			</h2>
			<ul className={styles.list}>
				{content.team.map((member) => (
					<li key={member.name} className={styles.teamCard}>
						<p className={styles.name}>{member.name}</p>
						<p className={styles.role}>{member.role}</p>
						<p className={styles.note}>{member.note}</p>
					</li>
				))}
			</ul>
		</section>

		<p className={styles.licenses}>{content.licensesNote}</p>
	</div>
);

export default CompanyAboutSections;
