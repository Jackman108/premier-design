// components/DocumentImage/DocumentImage.tsx
import Image from "next/image";
import styles from './DocumentImage.module.css';
import {FC} from "react";

interface DocumentImageProps {
    alt: string;
    src: string;
}

const DocumentImage: FC<DocumentImageProps> = ({alt, src}) => (
    <div className={styles.content__image}>
        <Image
            priority={true}
            src={src}
            alt={alt}
            placeholder='empty'
            width={2000}
            height={160}
            sizes="
                (max-width: 600px) 100vw,
                (max-width: 1440px) 60vw,
                1935px
            "
            className={styles.document_image}
        />
    </div>
);

export default DocumentImage;
