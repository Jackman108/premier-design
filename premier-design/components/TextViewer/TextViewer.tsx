import {FC} from "react";
import styles from "./TextViewer.module.css";
import Image from "next/image";
import {formatText} from "../../utils/formatText";

interface TextViewerProps {
    text: string;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    image: string;

}

const TextViewer: FC<TextViewerProps> = ({text, showModal, setShowModal, image}) => {

    return (
        <>
            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modal__content}>
                        <div className={styles.content__image}>
                            <Image
                                src={image}
                                alt={text}
                                width={2000}
                                height={400}
                            />
                        </div>
                        <div className={styles.content__text}>
                            {formatText(text) || "Документ не найден"}
                        </div>
                        <button className={styles.modal__close} onClick={() => setShowModal(false)}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default TextViewer;