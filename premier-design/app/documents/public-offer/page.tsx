'use client';

import DocumentImage from '@features/documents-content/ui/document-image/DocumentImage';
import PublicOfferContent from '@features/documents-content/ui/document-page/PublicOfferContent';
import styles from '@features/documents-content/ui/document-page/DocumentPage.module.css';
import {UiButton} from '@shared/ui/primitives/UiButton';

const PublicOfferPage = () => {
	return (
		<section className={styles.document}>
			<div className={styles.document__container}>
				<DocumentImage src="/logo.svg" alt="public-offer" />
				<PublicOfferContent />
			</div>
			<div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
				<UiButton as="a" href="/" variant="secondary">
					На главную
				</UiButton>
			</div>
		</section>
	);
};

export default PublicOfferPage;
