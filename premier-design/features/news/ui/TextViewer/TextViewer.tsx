import {FC} from "react";
import styles from "./TextViewer.module.css";
import Image from "next/image";
import {formatText} from "../../utils/formatText";
import {TextViewerProps} from "@features/news/interface/TextViewer.props";
import {UiDialog} from "@shared/ui/primitives/UiDialog";


const TextViewer: FC<TextViewerProps> = ({title, text, showModal, setShowModal, image}) => {

    return (
        <UiDialog
            open={showModal}
            onOpenChange={setShowModal}
            overlayClassName={styles.modal}
            contentClassName={styles.modal__content}
        >
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
        </UiDialog>
    );
};
export default TextViewer;