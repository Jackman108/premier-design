import React, {FC} from 'react';
import styles from './Papers.module.css';
import {Paper} from '@features/papers/interface/Paper.props';
import {usePaperNavigation} from '@features/papers/hooks/usePaperNavigation';

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
                    aria-label={`Открыть документ ${paper.title}`}
                >
                    {paper.title}
                </button>
            ))}
        </div>
    );
};

export default Papers;
