import {CSSProperties, FC} from "react";
import Image from "next/image";
import type { PanelProps } from '@entities/panel';
import styles from "./PanelButton.module.css";

const PanelButton: FC<PanelProps> = ({onClick, icon, altText, text, position}) => (
	<button
		onClick={onClick}
		className={styles.button_common}
		style={position.bottom ? ({'--panel-bottom': position.bottom} as CSSProperties) : undefined}
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
