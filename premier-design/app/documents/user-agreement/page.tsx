'use client';

import {DocumentImage, UserAgreementContent} from '@features/documents-content';
import styles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import {UiButton} from '@shared/ui/primitives/UiButton';

const UserAgreementPage = () => {
	return (
		<section className={styles.document}>
			<div className={styles.document__container}>
				<DocumentImage src="/logo.svg" alt="user-agreement" />
				<UserAgreementContent />
			</div>
			<div className={styles.document__footerActions}>
				<UiButton as="a" href="/" variant="secondary">
					На главную
				</UiButton>
			</div>
		</section>
	);
};

export default UserAgreementPage;
