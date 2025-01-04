import {FC} from "react";
import styles from './PanelButton.module.css';
import Image from "next/image";
import {PanelProps} from "../../../interface/Panel.props";


const PanelButton: FC<PanelProps> = ({onClick, icon, altText, text, position}) => (
    <button
        onClick={onClick}
        className={`${styles['button_common']}`}
        style={{bottom: position.bottom}}
    >
        <Image
            src={icon}
            alt={altText}
            width={40}
            height={36}
            className={styles.button_icon}
        />
        <div className={styles.sticky_button_text}>
            <span>{text}</span>
        </div>
    </button>
);
export default PanelButton;
