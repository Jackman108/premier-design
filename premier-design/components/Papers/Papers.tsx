// Papers.tsx
import React, {FC} from 'react';
import styles from './Papers.module.css';
import {Paper} from '../../interface/Paper.props';
import {usePaperNavigation} from '../../hooks/usePaperNavigation';

export interface FooterPapersProps {
    papers: Paper[];
}

const Papers: FC<FooterPapersProps> = ({papers}) => {
    const {handlePaperClick} = usePaperNavigation();

    return (
        <div className={styles.papers__container}>
            {papers.map((paper: Paper) => (
                <button
                    key={paper.id}
                    onClick={() => handlePaperClick(paper.shortTitle)}
                    className={styles.paper__link}
                >
                    {paper.title}
                </button>
            ))}
        </div>
    );
};

export default Papers;
