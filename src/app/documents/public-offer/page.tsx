'use client';

import { DocumentBreadcrumbs, DocumentImage, PublicOfferContent } from '@features/documents-content';
import styles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import { UiButton } from '@shared/ui/primitives/UiButton';

const PublicOfferPage = () => {
	return (
		<section className={styles.document}>
			<div className={styles.document__container}>
				<DocumentBreadcrumbs />
				<DocumentImage src="/logo.svg" alt="public-offer" />
				<PublicOfferContent />
			</div>
			<div className={styles.document__footerActions}>
				<UiButton as="a" href="/" variant="secondary">
					На главную
				</UiButton>
			</div>
		</section>
	);
};

export default PublicOfferPage;
