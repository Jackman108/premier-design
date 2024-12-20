import React, {ReactElement} from 'react';
import styles from './Title.module.css';
import {TitleStyleProps} from '../../../interface/TitleStyle.props';

const Title = ({
                   title,
                   description,
                   titleStyle,
                   descriptionStyle,
               }: TitleStyleProps): ReactElement => {
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