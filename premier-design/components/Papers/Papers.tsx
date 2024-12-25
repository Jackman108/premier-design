// Papers.tsx
import React, {FC} from 'react';
import styles from './Papers.module.css';
import {Paper} from '../../interface/Paper.props';
import TextViewer from '../../components/TextViewer/TextViewer';
import {usePapers} from '../../hooks/usePapers';

interface FooterPapersProps {
    papers: Paper[];
}

const Papers: FC<FooterPapersProps> = ({papers}) => {
    const {selectedPaper, selectPaper, findPaper} = usePapers(papers);
    const [showModal, setShowModal] = React.useState(false);

    const handlePaperClick = (shortTitle: string) => {
        selectPaper(shortTitle);
        setShowModal(true);
    };

    const paper = findPaper(selectedPaper || "");

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

            <TextViewer
                title={paper?.title || ""}
                text={paper?.content || ""}
                image={paper?.image || ""}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </div>
    );
};

export default Papers;
