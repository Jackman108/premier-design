'use client';

import DocumentImage from '@features/documents-content/ui/document-image/DocumentImage';
import PrivacyPolicyContent from '@features/documents-content/ui/document-page/PrivacyPolicyContent';
import styles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import {UiButton} from '@shared/ui/primitives/UiButton';

const PrivacyPolicyPage = () => {
	return (
		<section className={styles.document}>
			<div className={styles.document__container}>
				<DocumentImage src="/logo.svg" alt="privacy-policy" />
				<PrivacyPolicyContent />
			</div>
			<div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
				<UiButton as="a" href="/" variant="secondary">
					На главную
				</UiButton>
			</div>
		</section>
	);
};

export default PrivacyPolicyPage;
