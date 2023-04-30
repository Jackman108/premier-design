import React from 'react';
import styles from './Title.module.css';
import { TitleProps } from './Title.props';


const Title = ({
    title,
    description,
    titleStyle,
    descriptionStyle,
}: TitleProps): JSX.Element => {
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