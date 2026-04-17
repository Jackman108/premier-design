import React, {FC} from 'react';
import Link from 'next/link';
import styles from './Papers.module.css';
import {Paper} from '@features/papers/interface/Paper.props';
import {documentHref} from '@features/papers/utils/documentHref';
import {PapersProps} from '@features/papers/interface/Papers.props';

const Papers: FC<PapersProps> = ({papers}) => {
    return (
        <div className={styles.papers__container}>
            {papers.map((paper: Paper) => (
                <Link
                    key={paper.id}
                    href={documentHref(paper.shortTitle)}
                    className={styles.paper__link}
                    aria-label={`Открыть документ ${paper.title}`}
                >
                    {paper.title}
                </Link>
            ))}
        </div>
    );
};

export default Papers;
