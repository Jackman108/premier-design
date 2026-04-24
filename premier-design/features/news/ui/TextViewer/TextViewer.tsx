import { FC } from "react";
import { Close as RdxDialogClose } from "@radix-ui/react-dialog";
import styles from "./TextViewer.module.css";
import Image from "next/image";
import { formatText } from "../../utils/formatText";
import { TextViewerProps } from "@features/news/interface/TextViewer.props";
import { UiDialog } from "@shared/ui/primitives/UiDialog";

const TextViewer: FC<TextViewerProps> = ({ title, text, showModal, onClose, image }) => {
    return (
        <UiDialog
            open={showModal}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
            overlayClassName={styles.modal}
            contentClassName={styles.modal__content}
            title={title}
            description="Подробный текст новости в модальном окне."
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
            <RdxDialogClose asChild>
                <button
                    className={styles.modal__close}
                    type="button"
                    aria-label="Закрыть окно"
                >
                    Закрыть
                </button>
            </RdxDialogClose>
        </UiDialog>
    );
};
export default TextViewer;
