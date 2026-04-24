import {FC, type ReactElement} from 'react';

import type {ContactsMicroUspAsideProps} from '@features/contacts/interface/ContactsMicroUspAside.props';

import styles from './ContactsMicroUspAside.module.css';

/** Секция USP на странице «Контакты» (данные — `data.contactsPage.uspAside` в `data.json`). */
const ContactsMicroUspAside: FC<ContactsMicroUspAsideProps> = ({uspAside}): ReactElement => (
	<aside className={styles.root} aria-label={uspAside.ariaLabel}>
		<ul className={styles.list}>
			{uspAside.items.map((line) => (
				<li key={line} className={styles.item}>
					{line}
				</li>
			))}
		</ul>
	</aside>
);

export default ContactsMicroUspAside;
