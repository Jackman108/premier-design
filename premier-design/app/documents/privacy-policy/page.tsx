'use client';

import { DocumentBreadcrumbs, DocumentImage, PrivacyPolicyContent } from '@features/documents-content';
import styles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import { UiButton } from '@shared/ui/primitives/UiButton';

const PrivacyPolicyPage = () => {
	return (
		<section className={styles.document}>
			<div className={styles.document__container}>
				<DocumentBreadcrumbs />
				<DocumentImage src="/logo.svg" alt="privacy-policy" />
				<PrivacyPolicyContent />
			</div>
			<div className={styles.document__footerActions}>
				<UiButton as="a" href="/" variant="secondary">
					На главную
				</UiButton>
			</div>
		</section>
	);
};

export default PrivacyPolicyPage;
