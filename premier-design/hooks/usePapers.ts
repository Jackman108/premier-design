import {useState} from 'react';
import {Paper} from '../interface/Paper.props';

export const usePapers = (papers: Paper[]) => {
    const [selectedPaper, setSelectedPaper] = useState<string | null>(null);

    const selectPaper = (shortTitle: string) => {
        setSelectedPaper(shortTitle);
    };

    const findPaper = (shortTitle: string): Paper | undefined => {
        return papers.find(paper => paper.shortTitle === shortTitle);
    };

    return {
        selectedPaper,
        selectPaper,
        findPaper,
    };
};
