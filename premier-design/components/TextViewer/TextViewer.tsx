import {FC} from "react";
import styles from "./TextViewer.module.css";
import Image from "next/image";
import {formatText} from "../../utils/formatText";
import {TextViewerProps} from "../../interface/TextViewer.props";


const TextViewer: FC<TextViewerProps> = ({title, text, showModal, setShowModal, image}) => {

    return (
        <>
            {showModal && (
                <div className={styles.modal} onClick={() => setShowModal(false)}>
                    <div className={styles.modal__content}>
                        <div className={styles.content__image}>
                            <Image
                                src={image}
                                alt={title}
                                width={2000}
                                height={200}
                            />
                        </div>
                        <div className={styles.content__text}>
                            {formatText(text) || "Документ не найден"}
                        </div>
                        <button className={styles.modal__close} onClick={() => setShowModal(false)}
                                aria-label="Закрыть окно">
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
export default TextViewer;