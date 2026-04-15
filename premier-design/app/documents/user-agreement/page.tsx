'use client';

import DocumentImage from '@features/documents-content/ui/document-image/DocumentImage';
import UserAgreementContent from '@features/documents-content/ui/document-page/UserAgreementContent';
import styles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import {UiButton} from '@shared/ui/primitives/UiButton';

const UserAgreementPage = () => {
	return (
		<section className={styles.document}>
			<div className={styles.document__container}>
				<DocumentImage src="/logo.svg" alt="user-agreement" />
				<UserAgreementContent />
			</div>
			<div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
				<UiButton as="a" href="/" variant="secondary">
					На главную
				</UiButton>
			</div>
		</section>
	);
};

export default UserAgreementPage;
