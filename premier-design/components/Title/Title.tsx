import React from 'react';
import styles from './Title.module.css';
import { TitleStyleProps } from './TitleStyle.props';

const Title = ({
    title,
    description,
    titleStyle,
    descriptionStyle,
}: TitleStyleProps): JSX.Element => {
    const titleClass = `${styles[titleStyle!]} ${styles.title}`;
    const descriptionClass = `${styles[descriptionStyle!]} ${styles.description}`;
    return (
        <>
            <h1 className={titleClass}>{title}</h1>
            <p className={descriptionClass}>{description}</p>
        </>
    );
};

export default Title;