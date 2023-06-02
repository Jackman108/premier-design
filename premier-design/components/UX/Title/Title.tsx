import React from 'react';
import styles from './Title.module.css';
import { TitleStyleProps } from './TitleStyle.props';

const Title = ({
    title,
    description,
    titleStyle,
    descriptionStyle,
}: TitleStyleProps): JSX.Element => {
    const titleClass = titleStyle ? `${styles[titleStyle]} ${styles.title}` : styles.title;
    const descriptionClass = descriptionStyle ? `${styles[descriptionStyle]} ${styles.description}` : styles.description;
    return (
        <>
            <h1 className={titleClass}>{title}</h1>
            <p className={descriptionClass}>{description}</p>
        </>
    );
};

export default Title;