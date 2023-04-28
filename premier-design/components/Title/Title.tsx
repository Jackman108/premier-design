import React, {useState} from 'react';
import styles from './Title.module.css';
import  TitleProps from './Title.props';

const Title = ({ title, description, titleStyle, descriptionStyle }: TitleProps): JSX.Element => {
    const [titleClass, setTitleClass] = useState(titleStyle === 'title-black' ? styles['title-black'] : styles['title-white']);
    const [descriptionClass, setDescriptionClass] = useState(descriptionStyle === 'description-black' ? styles['description-black'] : styles['description-white']);
    return (
        <>
            <h1 className={titleClass}>{title}</h1>
            <p className={descriptionClass}>{description}</p>
        </>
    );
};

export default Title;