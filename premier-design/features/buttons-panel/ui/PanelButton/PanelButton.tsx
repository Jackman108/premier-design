import {FC} from "react";
import styles from './PanelButton.module.css';
import Image from "next/image";
import {PanelProps} from "@features/buttons-panel/interface/PanelButton.props";


const PanelButton: FC<PanelProps> = ({onClick, icon, altText, text, position}) => (
    <button
        onClick={onClick}
        className={`${styles['button_common']}`}
        style={{bottom: position.bottom}}
        aria-label={text}
    >
        <Image
            src={icon}
            alt={altText}
            width={30}
            height={30}
            className={styles.button_icon}
        />
        <div className={styles.sticky_button_text}>
            <span>{text}</span>
        </div>
    </button>
);
export default PanelButton;
