import React from "react";
import styles from "./AboutUs.module.css";
import Title from "../Title/Title";
import { TitleStyleProps } from '../Title/TitleStyle.props';

const AboutUs: React.FC<TitleStyleProps> = ({
    id,
    title,
    description,
    titleStyle,
    descriptionStyle,

}): JSX.Element => {
    return (
        <section className={styles.aboutUs}>
            <div className={styles.aboutUs__container}>
                <Title
                    id={id}
                    titleStyle={titleStyle}
                    descriptionStyle={descriptionStyle}
                    title={title}
                    description={description}
                />

            </div>
        </section>
    );
};

export default AboutUs;