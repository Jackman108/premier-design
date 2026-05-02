// features/documents-content/ui/document-image
import Image from 'next/image';
import styles from './DocumentImage.module.css';
import { FC } from 'react';
import { DocumentImageProps } from '@features/documents-content/interface/DocumentImage.props';

const DOCUMENT_IMAGE_SIZES = '(max-width: 600px) 100vw, (max-width: 1440px) 60vw, 1935px';

const DocumentImage: FC<DocumentImageProps> = ({ alt, src }) => (
	<div className={styles.content__image}>
		<Image
			src={src}
			alt={alt}
			placeholder="empty"
			width={2000}
			height={160}
			sizes={DOCUMENT_IMAGE_SIZES}
			loading="lazy"
			className={styles.document_image}
		/>
	</div>
);

export default DocumentImage;
